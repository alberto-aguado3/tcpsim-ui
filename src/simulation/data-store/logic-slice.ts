import { createSlice } from "@reduxjs/toolkit";
import { ChannelConfig, PeerConfig, SimConfig, Simulation } from "tcpsim-logic";
import { getLogicInitialState } from "./init-states";

export interface LogicState {
    data: Simulation
}

//------------------------------BORRAR----------------------
//----------------------------------------------------------

export const logicInitialState: LogicState = {
    data: new Simulation(getLogicInitialState())
};

const logicSlice = createSlice({
    name: "logic",
    initialState: logicInitialState,
    reducers: {
        nextStep(state) {
            console.log("nextStep - About to run");
            const hasMoreEvents: boolean = state.data.runNextStep();
            console.log("nextStep - finished running");
        },
        startSimulation(state) {
            console.log("startSimulation - About to run");
            //TODO: handle error
            state.data.linkPeers();

            const err: Error|null = state.data.startSimulation();
            if (err !== null) {
                console.log(err);
            }

            console.log("startSimulation - finished running");
        }
    },

});

export const { nextStep, startSimulation } = logicSlice.actions;
export default logicSlice.reducer;
