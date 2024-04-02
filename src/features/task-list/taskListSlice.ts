import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AppState } from "../../app/store";
import taskService from "./taskAPI";
import { stateStatus } from "../../app/types";

export interface ITask {
  id: number;
  name: string;
  description: string;
  author: string;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface initialState {
  tasks: ITask[];
  status: stateStatus;
  error: string;
}

const initialState: initialState = {
  tasks: [],
  status: stateStatus.idle,
  error: "",
};

export const getAllTask = createAsyncThunk(
  "getAll",
  async (): Promise<ITask[]> => {
    return await taskService.getAllTasks();
  }
);

export const deleteTask = createAsyncThunk(
  "deleteTask",
  async (idTask: number): Promise<number> => {
    await taskService.deleteTask(idTask);
    return idTask;
  }
);

export const updateTask = createAsyncThunk(
  "updateTask",
  async (task: ITask): Promise<number> => {
    await taskService.updateTask(task);
    return task.id;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTask.pending, (state) => {
        state.status = stateStatus.loading;
        state.error = "";
      })
      .addCase(getAllTask.fulfilled, (state, action) => {
        state.status = stateStatus.succeeded;
        state.tasks = action.payload;
      })
      .addCase(getAllTask.rejected, (state, action) => {
        state.status = stateStatus.failed;
        state.error = action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((e) => e.id !== action.payload);
      });
  },
});

export const taskList = (state: AppState) => state.taskList;

export default taskSlice.reducer;
