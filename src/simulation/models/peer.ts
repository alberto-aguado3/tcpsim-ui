import { Endpoint } from "./segment";

export class Peer {
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
}

type ControlBlock = {
    connectionState: ConnectionState
    srcIp: string
    srcPort: string
    //dstEndpoint: Endpoint
    sndUna: number
    sndNxt: number
    sndWnd: number
    rcvUna: number
    rcvNxt: number
    iss: number
}

type ConnectionState = "LISTEN" | "SYN_SENT" | "SYN_RECEIVED" | "ESTABLISHED" | "FIN_WAIT1" | "FIN_WAIT2" |
"CLOSE_WAIT" | "LAST_ACK" | "TIME_WAIT" | "CLOSED";

type Buffer = {
    startIndex: number
    cells: (string|undefined)[]
}

type Application = {
    dataSent: string
    dataReceived: string
}