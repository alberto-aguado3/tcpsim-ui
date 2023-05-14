import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { Peer, PeerBuilder, PeerConfig } from "tcpsim-logic/src";

export const InitialSequenceNumber = () => {
    const [isn, setIsn] = useState<number|undefined>(14);    
    
    console.log("isn: ", isn);
    console.log("?" ? isn === undefined: isn);

    return (
        <div>
            <p>{isn === undefined ? "ISN = ?": `ISN = ${isn}`}</p>
            <button onClick={() => {
                setIsn(isn!+1);
            }}>pene</button>
        </div>    
    );
};
