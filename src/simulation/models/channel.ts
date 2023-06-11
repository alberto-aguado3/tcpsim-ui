import { Segment } from "./segment";

export class Channel2 {
    public segments: Segment[] = [];
    public lossPercent: number;

    constructor(lossPercent: number) {
        this.lossPercent = lossPercent;
    }
}

export type Channel = {
    segments: Segment[],
    lossPercent: number,
}