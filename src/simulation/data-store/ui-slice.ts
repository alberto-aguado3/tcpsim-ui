import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Peer as LogicPeer, Simulation, TransmissionControlBlock, Application as LogicApplication, DataBuffer, GetConnectionStateString, Channel as LogicChannel, SegmentWithTimestamp} from "tcpsim-logic";
//import { Simulation } from "tcpsim-logic/dist/simulation";
//import { Peer as LogicPeer, Application as LogicApplication, DataBuffer, GetConnectionStateString } from "tcpsim-logic/dist/peer";
//import { TransmissionControlBlock } from "tcpsim-logic/dist/peer/transmission-control-block";
import { Application, ControlBlock, Buffer, Peer, Channel, ConnectionState, Segment, mapLogicToUiSegment, TravelState, History } from "../models";
import { getUiInitialState } from "./init-states";

export interface UiState {
    activePeer: Peer
    passivePeer: Peer
    channel: Channel
    history: History
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
    let wanderingSegments: Segment[] = channel.wanderingSegments.map(simulationSegment => {
        return mapLogicToUiSegment(simulationSegment, "WANDERING");
    });

    return {
        segments: wanderingSegments, 
    }; 
    
}

function combineLogicSegmentsToUi(delivered: SegmentWithTimestamp[], lost: SegmentWithTimestamp[]): Segment[] {
    const segments: Segment[] = [];

    if (lost.length === 0) {
        return delivered.map(segment => mapLogicToUiSegment(segment, "DELIVERED"));
    }

    if (delivered.length === 0) {
        return lost.map(segment => mapLogicToUiSegment(segment, "LOST"));
    }

    let i = 0;
    let j = 0;

    while (i < delivered.length && j < lost.length) {
        if (delivered[i].createdAt <= lost[j].createdAt) {
            segments.push(mapLogicToUiSegment(delivered[i], "DELIVERED"));
            i++;
        } else {
            segments.push(mapLogicToUiSegment(lost[j], "LOST"));
            j++;
        }
    }

    return segments;
}

function mapLogicToUiHistory(channel: LogicChannel): History {
    return {
        //lossPercent: 0,
        segments: combineLogicSegmentsToUi(channel.deliveredSegments, channel.lostSegments),
    };
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

            state.channel = mapLogicToUiChannel(action.payload.channel);

            state.history = mapLogicToUiHistory(action.payload.channel);

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