import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITaskBase, stateStatus, TASK_DEFAULT_VALUE } from "../../app/types";
import { AppState } from "../../app/store";
import { getTaskById, putTask } from "./taskEditAPI";

export interface initialState {
  task: ITaskBase;
  status: stateStatus;
}

const initialState: initialState = {
  task: TASK_DEFAULT_VALUE,
  status: stateStatus.idle,
};

export const getTaskEdit = createAsyncThunk(
  "getTaskEdit",
  async (idTask: number): Promise<ITaskBase> => {
    return await getTaskById(idTask);
  }
);

export const editTask = createAsyncThunk(
  "editTask",
  async (request: { task: ITaskBase; idTask: number }): Promise<ITaskBase> => {
    return await putTask(request.task, request.idTask);
  }
);

export const taskEditSlice = createSlice({
  name: "taskEdit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTaskEdit.pending, (state) => {
        state.status = stateStatus.loading;
      })
      .addCase(getTaskEdit.fulfilled, (state, action) => {
        state.status = stateStatus.succeeded;
        state.task = action.payload;
      });
    builder.addCase(editTask.fulfilled, (state) => {
      state.status = stateStatus.succeeded;
    });
  },
});

export const currentTask = (state: AppState) => state.currentTask;

export default taskEditSlice.reducer;
