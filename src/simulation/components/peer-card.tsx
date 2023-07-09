import React from "react";
import { Peer } from "../models";
import { ConnectionStateCard } from "./connection-state-card";
import { NodeCard } from "./node-card";

interface PeerCardProps {
    peer: Peer,
    isPassive: boolean
}

export const PeerCard: React.FC<PeerCardProps> = ({peer, isPassive}) => {
    
    return (
        <div>
            <NodeCard isPassive={isPassive} />
            <ConnectionStateCard connState={peer.controlBlock.connectionState} />

        </div>
    );
};

/*

<ReceiverBuffer buffer={peer.recvBuffer} controlBlock={peer.controlBlock} />
            <InitialSequenceNumber isn={peer.controlBlock.iss} />
            <SenderBuffer buffer={peer.sendBuffer} controlBlock={peer.controlBlock} />
            
            */