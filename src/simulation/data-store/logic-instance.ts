import { Simulation } from "tcpsim-logic";
import { getLogicInitialState } from "./init-states";


//TODO: find way to pass starting config from components
//1.Esto igual a null.
//2.Que la config use datos del formulario (boton de "Start" lleva la config, crea instancia)
//3.Profit!
export const simulation: Simulation = new Simulation();

export const inicializarSimulation = () => {
    //TODO: handle error
    const err: Error|null = simulation.startSimulation();
    if (err !== null) {
        console.log(err);
    }

};