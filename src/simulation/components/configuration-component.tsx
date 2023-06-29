import React, { ChangeEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ChannelConfig, PeerConfig, SimConfig, Simulation } from "tcpsim-logic";
import { updateSimUiData } from "../data-store";

interface ConfigurationComponentProps {
    simulation: Simulation
}

export const ConfigurationComponent: React.FC<ConfigurationComponentProps> = ({ simulation }) => {
    //const dataToBRef = useRef<HTMLInputElement>(null);
    //const dataToARef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const initialConfig: SimConfig = {
        active: {
            
        },
        passive:{

        },
        channel: {
            lossPercent: 0,
            rtt: 2*1000,
        }
    };

    const [configuration, setConfiguration] = useState<SimConfig>(initialConfig);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        if (name.includes(".")) {
            const [nestedProperty, nestedKey] = name.split(".");
            setConfiguration((prevConfiguration: SimConfig) => ({
                ...prevConfiguration,
                [nestedProperty]: {
                    ...prevConfiguration[nestedProperty],
                    [nestedKey]: value,
                },
                
            }));
        } else {
            setConfiguration(prevConfiguration => ({
                ...prevConfiguration,
                [name]: value
            }));
        }
    };

    const handleSimulationStart = (event: React.MouseEvent<HTMLFormElement>): void => {
        event.preventDefault();

        simulation.loadConfig(configuration);

        //simulation.startSimulation();
        dispatch(updateSimUiData(simulation));

    };


    return (
        <form onSubmit={handleSimulationStart}>
            <h3>Active peer</h3>
            <label>
                Data to send:
                <input type="text" name="active.applicationData" value={configuration.active.applicationData} onChange={handleChange} />
                <button type="submit" >Load configuration</button>
            </label>
        </form>
    );

    /*
                <label htmlFor="dataToB" >Data to send to B:</label>
            <input name="dataToB" type="text" ref={dataToBRef}></input>
            <label htmlFor="dataToA">Data to send to A:</label>
            <input name="dataToA" type="text" ref={dataToARef}></input>
            <button type="button" onClick={handleSimulationStart}>Start simulation</button>
    */
};