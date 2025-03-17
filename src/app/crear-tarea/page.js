import TaskForm from "../../components/taskForm/TaskForm";
import styles from "./page.module.css";

const CreateTaskPage = () => {
  return (
    <section className={styles.page}>
      <TaskForm />
    </section>
  );
};

export default CreateTaskPage;
