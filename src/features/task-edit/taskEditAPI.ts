import { ITaskBase } from "../../app/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getTaskById = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/tasks/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error getById::", error);
    throw error;
  }
};

export const putTask = async (data: ITaskBase, id: number) => {
  try {
    const response = await fetch(`${apiUrl}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Error creating::", error);
    throw error;
  }
};
