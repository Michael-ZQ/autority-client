import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.css";
import TaskList from "../features/task-list/taskList";

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Autority Challenge</title>
      </Head>
      <TaskList />
    </div>
  );
};

export default IndexPage;
