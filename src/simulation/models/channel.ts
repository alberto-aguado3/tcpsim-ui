import { Segment } from "./segment";

export class Channel {
    public segments: Segment[] = [];
    public lossPercent: number;

    constructor(lossPercent: number) {
        this.lossPercent = lossPercent;
    }
}
