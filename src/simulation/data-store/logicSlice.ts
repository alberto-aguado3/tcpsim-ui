import { createSlice } from "@reduxjs/toolkit";
import { ChannelConfig, PeerConfig, SimConfig, Simulation } from "tcpsim-logic";

interface LogicState {
    objetoComplejo: Simulation
}

//------------------------------BORRAR----------------------
const activePeer: PeerConfig = {
    applicationData: "Prueba de enviar datos"
};
const passivePeer: PeerConfig = {};
const channel: ChannelConfig = {
    lossPercent: 0,
    rtt: 2*1000,
};

const simCfg: SimConfig = new SimConfig(activePeer, passivePeer, channel);
//----------------------------------------------------------

const initialState: LogicState = {
    objetoComplejo: new Simulation(simCfg)
};

const logicSlice = createSlice({
    name: "logic",
    initialState: initialState,
    reducers: {
        nextStep(state) {
            const hasMoreEvents: boolean = state.objetoComplejo.runNextStep();
        },
        startSimulation(state) {
            //TODO: handle error
            state.objetoComplejo.linkPeers();

            const err: Error|null = state.objetoComplejo.startSimulation();
            if (err !== null) {
                console.log(err);
            }
        }
    }
});

export const { nextStep, startSimulation } = logicSlice.actions;
export default logicSlice.reducer;
