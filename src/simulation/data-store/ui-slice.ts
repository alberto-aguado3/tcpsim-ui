import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Peer as LogicPeer, Simulation } from "tcpsim-logic";
import { Application as LogicApplication, DataBuffer, GetConnectionStateString } from "tcpsim-logic/dist/peer";
import { TransmissionControlBlock } from "tcpsim-logic/dist/peer/transmission-control-block";
import { Application, ControlBlock, Buffer, Peer, Channel, ConnectionState } from "../models";
import { getUiInitialState } from "./init-states";

export interface UiState {
    activePeer: Peer
    passivePeer: Peer
    channel: Channel
}

//------------------------------BORRAR----------------------
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

//----------------------------------------------------------

export const uiInitialState: UiState = getUiInitialState();

const uiSlice = createSlice({
    name: "ui-simulator",
    initialState: uiInitialState,
    reducers: {
        updatePeers: (state, action: PayloadAction<Simulation>) => {
            const actPeer = action.payload.getActivePeer();
            const pasPeer = action.payload.getPassivePeer();
            state.activePeer = mapLogicToUiPeer(actPeer);
            state.passivePeer = mapLogicToUiPeer(pasPeer);
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

export const { updatePeers } = uiSlice.actions;
export default uiSlice.reducer;