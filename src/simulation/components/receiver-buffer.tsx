import React from "react";
import { Buffer, ControlBlock } from "../models";
import { DataBuffer } from "./data-buffer";

interface ReceiverBufferProps {
    buffer: Buffer,
    controlBlock: ControlBlock,
}

export const ReceiverBuffer: React.FC<ReceiverBufferProps> = ({buffer, controlBlock}) => {
    // TODO: add window graphically
    return (
        <DataBuffer buffer={buffer} />
    );
};
