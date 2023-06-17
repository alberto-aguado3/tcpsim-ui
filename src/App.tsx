import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { SimulatorComponent } from "./simulation/components";
import store, { inicializarSimulation } from "./simulation/data-store";

export const App = () => {
    useEffect(() => {
        inicializarSimulation();
    });

    return (
        <>
        <h3>This is a TCP simulator. Future instructions will be added here...</h3>
        <Provider store={store}>
            <SimulatorComponent />
        </Provider>
        
        </>
    );
};