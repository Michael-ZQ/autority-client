import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ITask, deleteTask, getAllTask, taskList } from "./taskListSlice";
import styles from "./taskList.module.css";
import { useRouter } from "next/router";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { tasks } = useAppSelector(taskList);

  useEffect(() => {
    dispatch(getAllTask());
  }, []);

  const handleEdit = (task: ITask): void => {
    router.push(`/task/${task.id}`);
  };

  return (
    <div>
      <div className={styles.taskListHeader}>
        <h1>Task List</h1>

        <button className={styles.addBtn} onClick={() => router.push("/task")}>
          Add task
        </button>
      </div>
      <div className={styles.taskCards}>
        {tasks.map((task: ITask) => (
          <div
            key={task.id}
            className={styles.taskCard}
            style={
              task.isComplete
                ? { background: "#0b6730" }
                : { background: "#a58c13" }
            }
          >
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>
              <strong>Author:</strong> {task.author}
            </p>
            <p>
              <strong>Status:</strong>
              {task.isComplete ? "Completed" : "Incomplete"}
            </p>
            <button onClick={() => handleEdit(task)} className={styles.editBtn}>
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
