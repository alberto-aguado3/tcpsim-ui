import React from "react";
import { Buffer, ControlBlock, Peer } from "../models";
import { DataBuffer } from "./data-buffer";
import { ReceiverBuffer } from "./receiver-buffer";
import { SenderBuffer } from "./sender-buffer";

interface NodeCardProps {
    isPassive: boolean
}

export const NodeCard: React.FC<NodeCardProps> = ({isPassive}) => {
    //TODO: make a circle button or something
    return (
        <div>
            {isPassive ? "B" : "A"}

        </div>
    );
};
