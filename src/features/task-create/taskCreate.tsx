import { useRouter } from "next/router";
import React from "react";
import styles from "./TaskCreate.module.css";
import { useAppDispatch, useForm } from "../../app/hooks";
import { createTask } from "./taskCreateSlice";
import { TASK_DEFAULT_VALUE } from "../../app/types";

const TaskCreate = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handlerSubmit = async (data) => {
    dispatch(createTask(data));
    router.push("/");
  };

  const handleFormSubmit = useForm(TASK_DEFAULT_VALUE)(handlerSubmit);

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.item}>
          <label>Author:</label>
          <input type="text" name="author" />
        </div>
        <div className={styles.item}>
          <label>Name:</label>
          <input type="text" name="name" />
        </div>
        <div className={styles.item}>
          <label>Description:</label>
          <textarea name="description" />
        </div>
        <button className={styles.submitBtn} type="submit">
          Done
        </button>
      </form>
    </div>
  );
};

export default TaskCreate;
