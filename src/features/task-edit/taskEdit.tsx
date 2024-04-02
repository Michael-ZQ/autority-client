import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useForm } from "../../app/hooks";
import styles from "./taskEditStyle.module.css";
import { ITaskBase, TASK_DEFAULT_VALUE } from "../../app/types";
import { currentTask, editTask, getTaskEdit } from "./taskEditSlice";

const TaskEdit = (props: { id: number }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const data = useAppSelector(currentTask);
  const [initialValues, setInitialValues] = useState(TASK_DEFAULT_VALUE);

  useEffect(() => {
    dispatch(getTaskEdit(props.id));
  }, [getTaskEdit, props.id]);

  useEffect(() => {
    if (data.task.id === props.id) setInitialValues(data.task);
  }, [data]);

  const handlerSubmit = async (formData: ITaskBase) => {
    dispatch(editTask({ task: formData, idTask: props.id }));
    router.push("/");
  };

  const handleCompleteTask = async () => {
    dispatch(
      editTask({
        task: { ...initialValues, isComplete: !initialValues.isComplete },
        idTask: props.id,
      })
    );
    router.push("/");
  };

  const handleFormSubmit = useForm(initialValues)(handlerSubmit);

  return (
    <div>
      <div className={styles.container}>
        <button className={styles.completeBtn} onClick={handleCompleteTask}>
          {initialValues.isComplete ? "Incomplete" : "Completed"}
        </button>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.item}>
            <label>Author:</label>
            <input
              type="text"
              name="author"
              defaultValue={initialValues.author}
            />
          </div>
          <div className={styles.item}>
            <label>Name:</label>
            <input type="text" name="name" defaultValue={initialValues.name} />
          </div>
          <div className={styles.item}>
            <label>Description:</label>
            <textarea
              name="description"
              defaultValue={initialValues.description}
            />
          </div>
          <button className={styles.submitBtn} type="submit">
            update
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskEdit;
