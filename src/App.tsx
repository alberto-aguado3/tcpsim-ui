import React, { useState } from "react";
import {Button, Input} from "@mui/material";

export const App = () => {
    
    const [itemDescription, setItemDescription] = useState<string>("");
    const [items, setItems] = useState<string[]>([]);

    return (
        <div>
            <Input
             value={itemDescription}
             onChange={(event) => {
                event.preventDefault(); //
                setItemDescription(event.target.value);
             }}
            />
            <Button
                onClick={()=>{
                    if (itemDescription !== "") {
                        setItems([...items, itemDescription]);
                    }
                    setItemDescription("");
                }}
            >
                Create
            </Button>
            <ul>
                {items.map((item) => <li>{item}</li>)}
            </ul>
        </div>
    );
};