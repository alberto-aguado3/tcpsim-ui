import { combineReducers } from "redux";
import uiSlice from "./ui-slice";

const rootReducer = combineReducers({
    //logic: logicSlice,
    simulator: uiSlice,
    //mapper: logicUiMapperReducer,
});

export default rootReducer;
