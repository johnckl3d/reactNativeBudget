import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
//import monitorReducersEnhancer from "./enhancers/monitorReducers";
import reducer from "@Reducers/index";

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: reducer,
    middleware: [thunkMiddleware],
    preloadedState,
    //enhancers: [monitorReducersEnhancer],
  });

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(reducer));
  }

  return store;
}
