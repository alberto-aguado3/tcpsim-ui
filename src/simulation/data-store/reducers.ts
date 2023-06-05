import { combineReducers } from "redux";
import logicSlice from "./logicSlice";

// initial state
const rootReducer = combineReducers({
    logic: logicSlice,
});

export default rootReducer;
