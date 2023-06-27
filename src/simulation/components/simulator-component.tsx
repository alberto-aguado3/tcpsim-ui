import React, { useRef } from "react";
import store from "../data-store/store";
import { DataBuffer } from "./data-buffer";
import { InitialSequenceNumberCard } from "./initial-sequence-number";
import { useDispatch } from "react-redux";
import { PeerComponent } from "./peer-component";
import { Button } from "@mui/base";
import { simulation, updateSimUiData } from "../data-store";
import { Simulation } from "tcpsim-logic";
import { ConfigurationComponent } from "./configuration-component";

export const SimulatorComponent = () => {
    const dispatch = useDispatch();

    const simulationRef = useRef(new Simulation);


    return (
        <div>
            <PeerComponent isPassive={false} />

            -------------Channel---------------

            <PeerComponent isPassive={true} />

            <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                simulationRef.current.runNextStep();
                const updateUiAction = updateSimUiData(simulationRef.current);
                dispatch(updateUiAction);
            }} > Next Event</Button>

            <ConfigurationComponent simulation={simulationRef.current} />
        </div>
    );
};