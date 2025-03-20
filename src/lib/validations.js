import * as Yup from "yup";

export const validationSchema = Yup.object({
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
      /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,!?\\s]*$/,
      "La descripción contiene caracteres inválidos"
    ),
});
