import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { HistoryComponent, SimulatorComponent } from "./simulation/components";
import store from "./simulation/data-store";

export const App = () => {

    return (
        <>
        <h3>This is a TCP simulator. Enter the configuration and start the live simulation.</h3>
        <Provider store={store}>
            <SimulatorComponent />


            ---------------------------

            <h2>History</h2>
            <HistoryComponent></HistoryComponent>
        </Provider>
        
        </>
    );
};