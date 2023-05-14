import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { Peer, PeerBuilder, PeerConfig } from "tcpsim-logic/src";
import { InitialSequenceNumber } from "./initial-sequence-number";

export const DataBuffer = () => {
    const [data, setData] = useState<DataCell[]>([]);    
    
    return (
        <ButtonGroup >
            {data.map((cellData) => {
                return <Button disabled={true}>{"" ? undefined: cellData}</Button>;
            })}
            <Button onClick={()=>{setData([...data, "a"]);}}>Debug: Añadir celda</Button>
        </ButtonGroup>
        
    );
};

type DataCell = string|undefined;