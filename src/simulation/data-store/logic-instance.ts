import { Simulation } from "tcpsim-logic";
import { getLogicInitialState } from "./init-states";


//TODO: find way to pass starting config from components
export const simulation: Simulation = new Simulation(getLogicInitialState());

export const inicializarSimulation = () => {
    console.log("startSimulation - About to run");
    //TODO: handle error
    simulation.linkPeers();

    const err: Error|null = simulation.startSimulation();
    if (err !== null) {
        console.log(err);
    }

    console.log("startSimulation - finished running");
};