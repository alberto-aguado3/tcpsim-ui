import { GetConnectionStateString, Peer as LogicPeer, Application as ApplicationLogic, TransmissionControlBlock, DataBuffer } from "tcpsim-logic";
//import { DataBuffer } from "tcpsim-logic/dist/peer";
//import { TransmissionControlBlock } from "tcpsim-logic/dist/peer/transmission-control-block";
//import { Application as ApplicationLogic } from "tcpsim-logic/dist/peer";

export class Peer2 {
    public controlBlock: ControlBlock;
    public sendBuffer: Buffer;
    public recvBuffer: Buffer;
    public application: Application;

    constructor(ctrlBlock: ControlBlock, sendBuffer: Buffer, recvBuffer: Buffer, application: Application) {
        this.controlBlock = ctrlBlock;
        this.sendBuffer = sendBuffer;
        this.recvBuffer = recvBuffer;
        this.application = application;
    }

    public mapLogicPeer(peer: LogicPeer): void {
        this.mapLogicControlBlock(peer.ctrlBlock);
        this.mapSndBuffer(peer.sendBuffer);
        this.mapRcvBuffer(peer.recvBuffer);
        this.mapApplication(peer.application);
    }

    private mapLogicControlBlock(block: TransmissionControlBlock): void {
        this.controlBlock.connectionState = GetConnectionStateString(block.connState) as ConnectionState;
        this.controlBlock.srcIp = block.srcEndpoint.ip;
        this.controlBlock.srcPort = block.srcEndpoint.port;
        this.controlBlock.sndUna = block.sender.sndUna;
        this.controlBlock.sndNxt = block.sender.sndNxt;
        this.controlBlock.sndWnd = block.sender.sndWnd;
        this.controlBlock.rcvNxt = block.receiver.rcvNxt;
        this.controlBlock.rcvWnd = block.receiver.rcvWnd;
        this.controlBlock.iss = block.sender.iss ?? 0;
    }

    private mapSndBuffer(sndBuffer: DataBuffer): void {
        const logicData: (string|undefined)[] = sndBuffer.dumpContent() as (string | undefined)[];
        this.sendBuffer.cells = logicData.map(elem => elem === undefined ? null: elem);
        this.sendBuffer.startIndex = sndBuffer.offset();
    }

    private mapRcvBuffer(rcvBuffer: DataBuffer): void {
        const logicData: (string|undefined)[] = rcvBuffer.dumpContent() as (string | undefined)[];
        this.recvBuffer.cells = logicData.map(elem => elem === undefined ? null: elem);
        this.recvBuffer.startIndex = rcvBuffer.offset();
    }

    private mapApplication(app: ApplicationLogic): void {
        this.application.dataReceived = app.getDataReceived();
        this.application.dataToSend = app.getDataToSend();
    }
}

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