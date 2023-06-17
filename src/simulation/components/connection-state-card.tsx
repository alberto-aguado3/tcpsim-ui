import { Button } from "@mui/base";
import React from "react";
import { Buffer, ConnectionState, ControlBlock, Peer } from "../models";
import { DataBuffer } from "./data-buffer";
import { ReceiverBuffer } from "./receiver-buffer";
import { SenderBuffer } from "./sender-buffer";

interface ConnectionStateCardProps {
    connState: ConnectionState
}

export const ConnectionStateCard: React.FC<ConnectionStateCardProps> = ({connState}) => {
    return (
        <div>
            <Button disabled={true} >{connState}</Button>

        </div>
    );
};