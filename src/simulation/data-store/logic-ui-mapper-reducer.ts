import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { Application as LogicApplication, DataBuffer } from "tcpsim-logic/dist/peer";
import { Application, Buffer, ConnectionState, ControlBlock, Peer } from "../models";
import { logicInitialState, LogicState } from "./logic-slice";
import { uiInitialState, UiState } from "./ui-slice";
import { GetConnectionStateString, Peer as LogicPeer, Simulation } from "tcpsim-logic";
//import { TransmissionControlBlock } from "tcpsim-logic/dist/peer/transmission-control-block";



interface uiAndLogic {
    ui: UiState
    logic: LogicState
}

const initialState: uiAndLogic = {
    ui: uiInitialState,
    logic: logicInitialState,
};

const logicUiMapperSlice = createSlice({
    name: "mapper",
    initialState: initialState,
    reducers: {
        mapLogicToUi: (state, action: PayloadAction<Simulation>) => {
            console.log("mapLogicToUi - about to run");
            const actPeer = action.payload.getActivePeer();
            const pasPeer = action.payload.getPassivePeer();

            /*
            state.ui.simulator.activePeer.mapLogicPeer(actPeer);
            state.ui.simulator.passivePeer.mapLogicPeer(pasPeer);
            */
            //TODO: map channel, get Segments?? idk
            
            console.log("mapLogicToUi - finished running. Estados active - passive: ", state.ui.activePeer.controlBlock.connectionState, state.ui.passivePeer.controlBlock.connectionState);
            /*
            return {
                ...state,
                ui: {
                    ...state.ui,
                    activePeer: mapLogicToUiPeer(actPeer),
                    passivePeer: mapLogicToUiPeer(pasPeer),
                }
            };
            */
        }
    }
});

export const { mapLogicToUi } = logicUiMapperSlice.actions;
export default logicUiMapperSlice.reducer;