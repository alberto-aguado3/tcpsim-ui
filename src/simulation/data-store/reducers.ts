import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logicSlice, { logicInitialState, LogicState } from "./logic-slice";
import uiSlice, { uiInitialState, UiState } from "./ui-slice";
import logicUiMapperSlice from "./logic-ui-mapper-reducer";
import logicUiMapperReducer from "./logic-ui-mapper-reducer";


const rootReducer2 = createSlice({
    name: "root",
    initialState: {},
    reducers: {
        updateBoth: (state, action) => {
            
        }
    }
});

const rootReducer = combineReducers({
    logic: logicSlice,
    ui: uiSlice,
    mapper: logicUiMapperReducer,
});


export default rootReducer;
