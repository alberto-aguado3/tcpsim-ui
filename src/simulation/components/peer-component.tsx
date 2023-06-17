import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../data-store";
import { Peer } from "../models";
import { ApplicationComponent } from "./application-component";
import { PeerCard } from "./peer-card";
import { ReceiverBuffer } from "./receiver-buffer";
import { SenderBuffer } from "./sender-buffer";

interface PeerComponentProps {
    isPassive: boolean
}

export const PeerComponent: React.FC<PeerComponentProps> = ({isPassive}) => {
    const peer: Peer = useSelector((state: RootState) => {
        if (isPassive) {
            return state.simulator.passivePeer;
        } else {
            return state.simulator.activePeer;
        }
    });

    return (
        <div>
            <ApplicationComponent application={peer.application} />
            <SenderBuffer buffer={peer.sendBuffer} controlBlock={peer.controlBlock} />
            <ReceiverBuffer buffer={peer.recvBuffer} controlBlock={peer.controlBlock} />
            
            <PeerCard isPassive={isPassive} peer={peer} />
            

        </div>

    );
};