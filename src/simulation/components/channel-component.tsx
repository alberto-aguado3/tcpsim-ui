import React from "react";
import { useSelector } from "react-redux";
import { Simulation } from "tcpsim-logic";
import { RootState } from "../data-store";

interface ChannelComponentProps {
    simulation: Simulation,
}

export const ChannelComponent: React.FC<ChannelComponentProps> = ({ simulation }) => {
    const history = useSelector((state: RootState) => state.simulator.channel);

    return (
        <div style={{
            //position: "absolute",
            width: "650px",
            height: "200px",
            background: "#66ccff"
        }}>
            <ul>
            {history.segments.map((segment) => (
                <li key={segment.id}>{`${segment.startTime && (segment.startTime / 1000).toFixed(2)} (${segment.travelState}): ${segment.header.source.ip} -> ${segment.header.destination.ip}. Content: ${segment.payload}`}</li>  
            ))}

            </ul>
        </div>
    );
};