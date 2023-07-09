import { GetConnectionStateString, Peer as LogicPeer, Application as ApplicationLogic, TransmissionControlBlock, DataBuffer } from "tcpsim-logic";
//import { DataBuffer } from "tcpsim-logic/dist/peer";
//import { TransmissionControlBlock } from "tcpsim-logic/dist/peer/transmission-control-block";
//import { Application as ApplicationLogic } from "tcpsim-logic/dist/peer";

export type Peer = {
    controlBlock: ControlBlock,
    sendBuffer: Buffer,
    recvBuffer: Buffer,
    application: Application,
}

export type ControlBlock = {
    connectionState: ConnectionState
    srcIp: string
    srcPort: string
    //dstEndpoint: Endpoint
    sndUna: number
    sndNxt: number
    sndWnd: number
    rcvWnd: number
    rcvNxt: number
    iss: number
}

export type ConnectionState = "LISTEN" | "SYN_SENT" | "SYN_RECEIVED" | "ESTABLISHED" | "FIN_WAIT1" | "FIN_WAIT2" |
"CLOSE_WAIT" | "LAST_ACK" | "TIME_WAIT" | "CLOSED";

export type Buffer = {
    startIndex: number
    cells: (string|null)[]
}

export type Application = {
    dataToSend: string
    dataReceived: string
}