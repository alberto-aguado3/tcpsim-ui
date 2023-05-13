import React, { useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import { Tasks } from "./tasks";

export const App = () => {
    return (
        <>
            <Container maxWidth={"lg"}>
                <CssBaseline />
                <Tasks />
            </Container >
        </>
    );
};