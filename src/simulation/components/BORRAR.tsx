import React from "react";
import store from "../data-store/store";
import { DataBuffer } from "./data-buffer";
import { InitialSequenceNumber } from "./initial-sequence-number";
import { Provider } from "react-redux";

export const Borrar = () => {
    return (
        <Provider store={store}>
            <DataBuffer />
            <InitialSequenceNumber />
        </Provider>
    );
};