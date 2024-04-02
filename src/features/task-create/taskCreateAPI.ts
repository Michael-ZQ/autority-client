import { ITaskBase } from "../../app/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const postTask = async (taskData: ITaskBase) => {
  try {
    const response = await fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      new Error(`Error: ${response.status} - ${response.statusText}`);
    }

  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
