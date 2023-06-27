import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../data-store";
import { Segment } from "../models";

export const SegmentHistory: React.FC = () => {
    const delivered: Segment[] = useSelector((state: RootState) => state.simulator.channel.segments);

    return (
        <div>
            <ul>
                {delivered.map((segment) => (
                <li key={segment.id}>{`${segment.startTime && (segment.startTime / 1000).toFixed(2)} (${segment.travelState}): ${segment.header.source.ip} -> ${segment.header.destination.ip}. Content: ${segment.payload}`}</li>  
                ))}
            </ul>
        </div>
    );
};
