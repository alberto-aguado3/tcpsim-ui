import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logicSlice, { logicInitialState, LogicState } from "./logic-slice";
import uiSlice, { uiInitialState, UiState } from "./ui-slice";
import logicUiMapperSlice from "./logic-ui-mapper-reducer";
import logicUiMapperReducer from "./logic-ui-mapper-reducer";

const rootReducer = combineReducers({
    //logic: logicSlice,
    simulator: uiSlice,
    //mapper: logicUiMapperReducer,
});

export default rootReducer;
