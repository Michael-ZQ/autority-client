export enum stateStatus {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

export interface ITaskBase {
  id: number;
  author: string;
  description: string;
  name: string;
  isComplete: boolean;
}

export const TASK_DEFAULT_VALUE: ITaskBase = {
  id: 0,
  author: "",
  name: "",
  description: "",
  isComplete: false,
};
