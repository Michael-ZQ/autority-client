import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import TaskEdit from "../../features/task-edit/taskEdit";

const taskId: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Edit task</h1>
      <div>
        <TaskEdit id={Number(router.query.id)} />
      </div>
    </div>
  );
};

export default taskId;
