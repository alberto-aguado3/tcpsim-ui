import React from "react";
import { useDispatch } from "react-redux";
import { Simulation } from "tcpsim-logic";
import { updateSimUiData } from "../data-store";

interface SimulatorControlsProps {
    simulation: Simulation
    isSimulationRunning: boolean,
    isSimulationRunningUpdate(running: boolean): void
}

export const SimulatorControls: React.FC<SimulatorControlsProps> = ({ simulation, isSimulationRunning, isSimulationRunningUpdate }) => {
    const dispatch = useDispatch();

    const handleStartSimulation = () => {
        //setTimeout(() => {
            simulation.startSimulation();
            isSimulationRunningUpdate(true);

            dispatch(updateSimUiData(simulation));
        //}, 1*1000);
    };

    const handleStopSimulation = () => {
        isSimulationRunningUpdate(!isSimulationRunning);
    };

    return (
        <div>
            <button onClick={handleStartSimulation}>Start Simulation</button>
            <button onClick={handleStopSimulation}>{isSimulationRunning ? "Stop": "Resume"}</button>
        </div>
    );
};