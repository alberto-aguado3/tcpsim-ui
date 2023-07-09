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
            //console.log("Active send progress: ", (state.simulator.activePeer.controlBlock.sndNxt - state.simulator.activePeer.sendBuffer.startIndex) / (state.simulator.activePeer.sendBuffer.cells.length) * 100);
            return state.simulator.activePeer;
        }
    });

    return (
        <div>
            <ApplicationComponent application={peer.application} />
            <SenderBuffer sendBuffer={peer.sendBuffer} controlBlock={peer.controlBlock} />
            <ReceiverBuffer recvBuffer={peer.recvBuffer} controlBlock={peer.controlBlock} />
            
            <PeerCard isPassive={isPassive} peer={peer} />
            

        </div>

    );
};