import { Simulation } from "tcpsim-logic";
import { getLogicInitialState } from "./init-states";


//TODO: find way to pass starting config from components
const simulation: Simulation = new Simulation(getLogicInitialState());