import { configureStore, compose } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({
    reducer: rootReducer,
    //config extra
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredPaths: ["logic.data", "mapper.logic.data"]//, "root.logic.data", "root.mapper.logic.data"],
        }
      });
    }
    /*
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          
          isSerializable: (value: any) => {
            console.log("isSerializableMiddleware. value=", value, typeof value !== "undefined" && typeof value !== "object");
            return typeof value !== "undefined" && typeof value !== "object";
          },
          
          ignoredPaths: ["logic.data", "mapper.logic.data"]//, "root.logic.data", "root.mapper.logic.data"], 
        }
      });
    },
    */
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;