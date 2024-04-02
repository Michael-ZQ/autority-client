import { NextPage } from "next";
import TaskCreate from "../../features/task-create/taskCreate";

const index: NextPage = () => {
  return (
    <div>
      <h1>Crear nueva tarea</h1>
      <TaskCreate />
    </div>
  );
};

export default index;
