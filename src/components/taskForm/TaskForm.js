import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./taskForm.module.css";
import { AiOutlineClose } from "react-icons/ai";

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres")
    .matches(
      /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/,
      "El título contiene caracteres inválidos"
    ),
  description: Yup.string()
    .trim()
    .max(255, "La descripción no puede superar los 255 caracteres")
    .matches(
      /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,!?\s]*$/,
      "La descripción contiene caracteres inválidos"
    ),
});

export default function TaskForm({ task, onClose, refreshTasks }) {
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
            const method = task ? "PUT" : "POST";
            const url = task ? `/api/tasks/${task.id}` : "/api/tasks";

            await fetch(url, {
              method,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            });

            refreshTasks();
            onClose();
            setSubmitting(false);
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
}
