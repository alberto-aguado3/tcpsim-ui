import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Peer as LogicPeer, Simulation, TransmissionControlBlock, Application as LogicApplication, DataBuffer, GetConnectionStateString, Channel as LogicChannel, SegmentWithTimestamp} from "tcpsim-logic";
//import { Simulation } from "tcpsim-logic/dist/simulation";
//import { Peer as LogicPeer, Application as LogicApplication, DataBuffer, GetConnectionStateString } from "tcpsim-logic/dist/peer";
//import { TransmissionControlBlock } from "tcpsim-logic/dist/peer/transmission-control-block";
import { Application, ControlBlock, Buffer, Peer, Channel, ConnectionState, Segment, mapLogicToUiSegment, TravelState } from "../models";
import { getUiInitialState } from "./init-states";

export interface UiState {
    activePeer: Peer
    passivePeer: Peer
    channel: Channel
}

//TODO: refactor into "mapper-service.ts ???"
function mapLogicToUiPeer(peer: LogicPeer): Peer {
    return {
        application: mapLogicToUiApplication(peer.application),
        controlBlock: mapLogicToUiControlBlock(peer.ctrlBlock),
        recvBuffer: mapLogicToUiRecvBuffer(peer.recvBuffer),
        sendBuffer: mapLogicToUiSendBuffer(peer.sendBuffer),
    };
}

function mapLogicToUiApplication(application: LogicApplication): Application {
    return {
        dataToSend: application.getDataToSend(),
        dataReceived: application.getDataReceived(),
    };
}

function mapLogicToUiControlBlock(block: TransmissionControlBlock): ControlBlock {
    return {
        connectionState: GetConnectionStateString(block.connState) as ConnectionState,
        srcIp: block.srcEndpoint.ip,
        srcPort: block.srcEndpoint.port,
        sndUna: block.sender.sndUna,
        sndNxt: block.sender.sndNxt,
        sndWnd: block.sender.sndWnd,
        rcvNxt: block.receiver.rcvNxt,
        rcvWnd: block.receiver.rcvWnd,
        iss: block.sender.iss ?? 0,
    };
}

function mapLogicToUiSendBuffer(sndBuffer: DataBuffer): Buffer {
    const logicBuffCells: (string|undefined)[] = sndBuffer.dumpContent() as (string|undefined)[];
    return  {
        cells: logicBuffCells.map(elem => elem === undefined ? null: elem),
        startIndex: sndBuffer.offset(),
    };
}

function mapLogicToUiRecvBuffer(rcvBuffer: DataBuffer): Buffer {
    const logicBuffCells: (string|undefined)[] = rcvBuffer.dumpContent() as (string|undefined)[];
    return  {
        cells: logicBuffCells.map(elem => elem === undefined ? null: elem),
        startIndex: rcvBuffer.offset(),
    };
}

function mapLogicToUiChannel(channel: LogicChannel): Channel {

    return {
        lossPercent: 0,
        segments: combineLogicSegmentsToUi(channel.deliveredSegments, channel.lostSegments),
    };
}

function combineLogicSegmentsToUi(delivered: SegmentWithTimestamp[], lost: SegmentWithTimestamp[]): Segment[] {
    const segments: Segment[] = [];

    let i = 0;
    let j = 0;

    while (i < delivered.length && j < lost.length) {
        if (delivered[i].createdAt <= lost[j].createdAt) {
            segments.push(mapLogicToUiSegment(delivered[i], "DELIVERED"));
            i++;
        } else {
            segments.push(mapLogicToUiSegment(lost[i], "LOST"));
            j++;
        }
    }

    return segments;
}

export const uiInitialState: UiState = getUiInitialState();

const simulatorSlice = createSlice({
    name: "simulator",
    initialState: uiInitialState,
    reducers: {
        updateSimUiData: (state, action: PayloadAction<Simulation>) => {
            const actPeer = action.payload.activePeer;
            const pasPeer = action.payload.passivePeer;
            state.activePeer = mapLogicToUiPeer(actPeer);
            state.passivePeer = mapLogicToUiPeer(pasPeer);

            //TODO: get segments as state in some way
            state.channel = mapLogicToUiChannel(action.payload.channel);

            /*
            return {
                
                ...state,
                activePeer: mapLogicToUiPeer(actPeer),
                passivePeer: mapLogicToUiPeer(pasPeer),
            }
            */
        }
    }
});

export const { updateSimUiData } = simulatorSlice.actions;
export default simulatorSlice.reducer;