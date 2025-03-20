import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import taskReducer from "./taskSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    tasks: taskReducer,
  },
});

export default store;
