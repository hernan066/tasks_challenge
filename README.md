# 📌 Gestor de Tareas con Next.js y SQLite

Este proyecto es una aplicación de gestión de tareas desarrollada con **Next.js 15**, utilizando **SQLite** para la persistencia de datos y **Formik + Yup** para la validación de formularios.

---

## 🚀 Características

✅ **Next.js 15** con **App Router** para el backend y frontend en un solo proyecto.  
✅ **Base de datos SQLite** para persistencia liviana y rápida.  
✅ **API REST** para la gestión de tareas con CRUD.  
✅ **Formik + Yup** para validación de formularios.  
✅ **Redux Toolkit** para la gestión eficiente del estado global.  
✅ **Uso de createAsyncThunk en Redux** para llamadas asincrónicas a la API.  
✅ **CSS Modules** para estilos aislados.  
✅ **Filtro y búsqueda de tareas** por nombre o estado (pendiente/completado).  
✅ **Modal con animaciones** para crear y editar tareas.  
✅ **Protección contra caracteres inválidos** en los formularios.

---

## 📸 Capturas de Pantalla

![Lista de tareas](https://ik.imagekit.io/mrprwema7/2_30PRXYfdnR.jpeg?updatedAt=1742263223485)
![Nueva tareas](https://ik.imagekit.io/mrprwema7/1_PYtg4_Qfx.jpeg?updatedAt=1742263223817)

---

## 🛠️ Instalación y Configuración

### 1️⃣ Clonar el Repositorio

```sh
 git clone https://github.com/hernan066/tasks_challenge.git
 cd tasks_challenge
```

### 2️⃣ Instalar Dependencias

```sh
 npm install
```

### 3️⃣ Inicializar la Base de Datos

```sh
 npm run db:init
```

### 4️⃣ Ejecutar el Proyecto en Desarrollo

```sh
 npm run dev
```

---

## 🔌 API Endpoints

### 📌 Obtener todas las tareas

`GET /api/tasks`

### 📌 Obtener una tarea por ID

`GET /api/tasks/:id`

### 📌 Crear una nueva tarea

`POST /api/tasks`

```json
{
  "title": "Aprender Next.js",
  "description": "Revisar la documentación oficial."
}
```

### 📌 Actualizar una tarea

`PUT /api/tasks/:id`

```json
{
  "title": "Aprender Next.js avanzado",
  "description": "Ver tutoriales sobre Server Actions.",
  "completed": true
}
```

### 📌 Eliminar una tarea

`DELETE /api/tasks/:id`

---
