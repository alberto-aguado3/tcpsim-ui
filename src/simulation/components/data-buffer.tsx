import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { Buffer } from "../models";
import "./styles.css";

/*
interface DataBufferProps {
    buffer: Buffer
}

export const DataBuffer: React.FC<DataBufferProps> = ({buffer}) => {
    
    return (
        <ButtonGroup >
            {buffer.cells.map((cell, index) => (
                <Button disabled={true} key={index}>{cell === null ? "" : cell}</Button>
            ))}
        </ButtonGroup>
    );
};
*/

interface DataBufferProps {
    progress: number
}

export const DataBuffer: React.FC<DataBufferProps> = ({progress}) => {
    return (
        <div className="fill" >
            <div className="progress-bar" style={{width: `${progress}%`, color: "blue"}} />
        </div>
    );
};