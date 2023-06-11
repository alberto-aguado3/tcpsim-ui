//import { Button, ButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Simulation } from "tcpsim-logic";
import { inicializarSimulation, mapLogicToUi, nextStep, startSimulation, updateSimUiData, simulation } from "../data-store";
import { RootState } from "../data-store/store";
import { Peer } from "../models";

export const InitialSequenceNumber = () => {
    console.log("RENDERIZANDO...");
    const [isn, setIsn] = useState<number|undefined>(14);

    const dispatch = useDispatch();

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
        <div>
            <p>{isn === undefined ? "ISN = ?": `ISN = ${isn}`}</p>
            <button onClick={() => {
                setIsn(isn!+1);
            }}>pene</button>
            <p>{activePeer.application.dataToSend}</p>
            <p>{passivePeer.application.dataReceived}</p>
            <div>{activePeer.controlBlock.srcIp}</div>
            <div>{activePeer.controlBlock.connectionState}</div>
            <div>{passivePeer.controlBlock.srcIp}</div>
            <div>{passivePeer.controlBlock.connectionState}</div>
            <button onClick={(e) => {
                simulation.runNextStep();
                const accionMapeo = updateSimUiData(simulation);
                dispatch(accionMapeo);
                
                console.log("Acciones despachadas, has pulsado botton");
            }
            }>Siguiente evento</button>
        </div>    
    );
};
