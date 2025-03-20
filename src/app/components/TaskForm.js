import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import { validationSchema } from "@/lib/validations";
import styles from "../styles/taskForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/store/uiSlice";
import { addTask, updateTask } from "@/store/taskSlice";

export const TaskForm = () => {
  const dispatch = useDispatch();
  const { modalTask: task } = useSelector((state) => state.ui);

  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{task ? "Editar Tarea" : "Nueva Tarea"}</h2>
        <button type="button" onClick={onClose} className={styles.closeButton}>
          <AiOutlineClose size={20} />
        </button>
        <Formik
          initialValues={{
            title: task?.title || "",
            description: task?.description || "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            if (task) {
              await dispatch(updateTask({ id: task.id, ...values }));
            } else {
              await dispatch(addTask(values));
            }
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={styles.inputGroup}>
                <Field
                  type="text"
                  name="title"
                  placeholder="Título"
                  className={styles.input}
                />
                <ErrorMessage
                  name="title"
                  component="p"
                  className={styles.error}
                />
              </div>
              <div className={styles.inputGroup}>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Descripción"
                  className={styles.textarea}
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className={styles.error}
                />
              </div>
              <button
                type="submit"
                className={styles.send_btn}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Guardando..." : task ? "Editar" : "Crear"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
