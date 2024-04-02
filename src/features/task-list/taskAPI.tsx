import { ITask } from "./taskListSlice";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAllTasks = async (): Promise<ITask[]> => {
  try {
    const response = await fetch(`${apiUrl}/tasks`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

const deleteTask = async (taskId: number): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    // A JSON response is not expected, only the status of the response is checked.
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

const updateTask = async (task: ITask): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: task.name,
        description: task.description,
        isComplete: task.isComplete,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    // A JSON response is not expected, only the status of the response is checked.
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

const taskService = {
  getAllTasks,
  deleteTask,
  updateTask,
};

export default taskService;
