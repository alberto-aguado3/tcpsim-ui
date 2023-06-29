import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { SegmentHistory, SimulatorComponent } from "./simulation/components";
import store from "./simulation/data-store";

export const App = () => {

    return (
        <>
        <h3>This is a TCP simulator. Future instructions will be added here...</h3>
        <Provider store={store}>
            <SimulatorComponent />


            ---------------------------

            <h2>Seccion config</h2>
            <div></div>

            ---------------------------

            <h2>Seccion historial</h2>
            <SegmentHistory></SegmentHistory>
        </Provider>
        
        </>
    );
};