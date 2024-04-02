import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import counterReducer from "../features/counter-reference-redux/counterSlice";
import taskListReducer from "../features/task-list/taskListSlice";
import currentTaskReducer from "../features/task-edit/taskEditSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      taskList: taskListReducer,
      currentTask: currentTaskReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
