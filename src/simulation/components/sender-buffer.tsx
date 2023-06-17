import React from "react";
import { Buffer, ControlBlock } from "../models";
import { DataBuffer } from "./data-buffer";

interface SenderBufferProps {
    buffer: Buffer,
    controlBlock: ControlBlock,
}

export const SenderBuffer: React.FC<SenderBufferProps> = ({buffer, controlBlock}) => {
    // TODO: add window graphically
    return (
        <DataBuffer buffer={buffer} />
    );
};