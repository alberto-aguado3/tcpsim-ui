import React from "react";
import store from "../data-store/store";
import { DataBuffer } from "./data-buffer";
import { InitialSequenceNumberCard } from "./initial-sequence-number";
import { Provider, useDispatch } from "react-redux";
import { PeerComponent } from "./peer-component";
import { Button } from "@mui/base";
import { simulation, updateSimUiData } from "../data-store";

export const SimulatorComponent = () => {
    const dispatch = useDispatch();
    return (
        <Provider store={store}>
            <PeerComponent isPassive={false} />

            -------------Channel---------------

            <PeerComponent isPassive={true} />

            <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                simulation.runNextStep();
                const updateUiAction = updateSimUiData(simulation);
                dispatch(updateUiAction);
            }} > Next Event</Button>
        </Provider>
    );
};