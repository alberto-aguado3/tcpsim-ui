//import { Button, ButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Simulation } from "tcpsim-logic";
import { inicializarSimulation, mapLogicToUi, nextStep, startSimulation, updateSimUiData, simulation } from "../data-store";
import { RootState } from "../data-store/store";
import { Peer } from "../models";

interface InitialSequenceNumberProps {
    isn: number
}

export const InitialSequenceNumberCard: React.FC<InitialSequenceNumberProps> = ({isn}) => {
    console.log("RENDERIZANDO...");

/*
    useEffect(() => {
        //const accion = startSimulation();
        //dispatch(accion);
        inicializarSimulation();
        const accionMapeo = updateSimUiData(simulation);
        dispatch(accionMapeo);

    }, []);

    const activePeer: Peer = useSelector((state: RootState) => {
        
        return state.simulator.activePeer;
    });

    const passivePeer: Peer = useSelector((state: RootState) => {
        
        return state.simulator.passivePeer;
    });
*/
    /*
    const activeCtrlBlock = useSelector((state: RootState) => {
        console.log("Dentro de active Peer useSelector: ", state);
        return state.logic.objetoComplejo.getActivePeer().ctrlBlock.connState;
    });
    const passiveCtrlBlock = useSelector((state: RootState) => {
        console.log("Dentro de active Peer useSelector: ", state);
        return state.logic.objetoComplejo.getPassivePeer().ctrlBlock.connState;
    });
    const activeApplication = useSelector((state:  RootState) => {
        return state.logic.objetoComplejo.getActivePeer().application;
    });
    const passiveApplication = useSelector((state:  RootState) => {
        return state.logic.objetoComplejo.getPassivePeer().application;
    });
    */
    


    return (
        <div>{isn}</div>    
    );
};
