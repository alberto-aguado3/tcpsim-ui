import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { Buffer } from "../models";
import { act } from "react-dom/test-utils";
import { useSelector } from "react-redux";
import { RootState } from "../data-store/store";

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
