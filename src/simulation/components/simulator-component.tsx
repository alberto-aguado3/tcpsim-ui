import React, { useEffect, useRef, useState } from "react";
import store from "../data-store/store";
import { DataBuffer } from "./data-buffer";
import { InitialSequenceNumberCard } from "./initial-sequence-number";
import { useDispatch } from "react-redux";
import { PeerComponent } from "./peer-component";
import { Button } from "@mui/base";
import { updateSimUiData } from "../data-store";
import { Simulation } from "tcpsim-logic";
import { ConfigurationComponent } from "./configuration-component";
import { TimerComponent } from "./timer-component";
import { SimulatorControls } from "./simulator-controls";
import { ChannelComponent } from "./channel-component";

export const SimulatorComponent = () => {
    const dispatch = useDispatch();
    const [simulatorTime, setSimulatorTime] = useState(new Date(0));
    const [isSimulationRunning, setIsSimulationRunning] = useState<boolean>(false);

    const simulationRef = useRef(new Simulation());

    const updateDate = (newDate: Date) => {
        setSimulatorTime(newDate);
    };

    const updateIsSimulationRunning = (running: boolean) => {
        setIsSimulationRunning(running);
    };

    useEffect(() => {

        if (isSimulationRunning) {
            const nextEventTime = simulationRef.current.getNextEventDate();
            if (nextEventTime === null) {
                if (isSimulationRunning) {
    
                    setIsSimulationRunning(false);
                    //setSimulatorTime(new Date(0));
                }
    
            } else {
                if (simulatorTime >= nextEventTime) {
                    simulationRef.current.runNextStep();
                    dispatch(updateSimUiData(simulationRef.current));
                }
            }
        }
    
      return () => {
        
      };
    }, [simulatorTime]);
    

    return (
        <div>
            <PeerComponent isPassive={false} />

            <ChannelComponent isSimulationRunning={isSimulationRunning} simulation={simulationRef.current} />

            <PeerComponent isPassive={true} />

            <SimulatorControls isSimulationRunning={isSimulationRunning} isSimulationRunningUpdate={updateIsSimulationRunning} simulation={simulationRef.current} />

            <TimerComponent date={simulatorTime} updateDate={updateDate} isTimerRunning={isSimulationRunning} />

            <ConfigurationComponent simulation={simulationRef.current} />
        </div>
    );
};