import { SegmentWithTimestamp } from "tcpsim-logic";

export type Segment = {
    header: Header
    payload: string
    id: string
    startTime?: number
    endTime?: number

    travelState: TravelState
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

export type TravelState = "WANDERING" | "DELIVERED" | "LOST";

export function mapLogicToUiSegment(segment: SegmentWithTimestamp, state: TravelState): Segment {
    return {
        header: {
            ackNumber: segment.segment.ackNumber,
            seqNumber: segment.segment.seqNumber,
            window: segment.segment.window,
            source: segment.segment.source,
            destination: segment.segment.destination,
            controlBits: {
                ack: segment.segment.controlBits.ack,
                syn: segment.segment.controlBits.syn,
                rst: segment.segment.controlBits.rst,
                fin: segment.segment.controlBits.fin,
            }
        },
        payload: segment.segment.payload.join(""),
        id: segment.segment.id,
        startTime: segment.createdAt.getTime(),
        endTime: segment.updatedAt.getTime(),
        travelState: state,
    };
}