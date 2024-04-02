import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITaskBase, stateStatus, TASK_DEFAULT_VALUE } from "../../app/types";
import { postTask } from "./taskCreateAPI";

interface initialState {
  form: ITaskBase;
  status: stateStatus;
}

const initialState: initialState = {
  form: TASK_DEFAULT_VALUE,
  status: stateStatus.idle,
};

export const createTask = createAsyncThunk(
  "createTask",
  async (data: ITaskBase) => {
    return await postTask(data);
  }
);

export const createTaskSlice = createSlice({
  name: "task-create",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.status = stateStatus.loading;
      })
      .addCase(createTask.fulfilled, (state) => {
        state.status = stateStatus.succeeded;
      });
  },
});

export default createTaskSlice.reducer;
