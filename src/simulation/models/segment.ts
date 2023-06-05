export class Segment {
    public header: Header;
    public payload: string[];

    constructor(header: Header, payload: string[]) {
        this.header = header;
        this.payload = payload;
    }
}

export type Header = {
    source: Endpoint
    destination: Endpoint
    controlBits: ControlBits
    seqNumber: number
    ackNumber: number
    window: number
}

export type ControlBits = {
    syn: boolean
    ack: boolean
    rst: boolean
    fin: boolean
}

export type Endpoint = {
    ip: string
    port: string
}
