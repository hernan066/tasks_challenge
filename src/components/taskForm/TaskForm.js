"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./taskForm.module.css";
import useFetch from "@/hooks/UseFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres"),
  description: Yup.string()
    .trim()
    .max(255, "La descripción no puede superar los 255 caracteres"),
});

export default function TaskForm() {
  const { request, loading, error } = useFetch("/api/tasks");

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <Formik
        initialValues={{ title: "", description: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await request("POST", values);
            resetForm();
            toast.success("Tarea creada con éxito");
          } catch (err) {
            console.error("Error al crear la tarea", err);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.taskForm}>
            <h2>Crear tarea</h2>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.inputContainer}>
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
            <div className={styles.inputContainer}>
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
              disabled={isSubmitting || loading}
              className={styles.button}
            >
              {isSubmitting || loading ? "Creando..." : "Crear Tarea"}
            </button>
          </Form>
        )}
      </Formik>
      {error && (
        <div className={styles.errorContainer}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
