# 📌 Gestor de Tareas con Next.js y SQLite

Este proyecto es una aplicación de gestión de tareas desarrollada con **Next.js 15**, utilizando **SQLite** para la persistencia de datos y **Formik + Yup** para la validación de formularios.

---

## 🚀 Características

✅ **Next.js 15** con **App Router** para el backend y frontend en un solo proyecto.  
✅ **Base de datos SQLite** para persistencia liviana y rápida.  
✅ **API REST** para la gestión de tareas con CRUD.  
✅ **Formik + Yup** para validación de formularios.  
✅ **CSS Modules** para estilos aislados.  
✅ **Filtro y búsqueda de tareas** por nombre o estado (pendiente/completado).  
✅ **Modal con animaciones** para crear y editar tareas.  
✅ **Protección contra caracteres inválidos** en los formularios.

---

## 📸 Capturas de Pantalla

_Aquí puedes subir imágenes del proyecto_

---

## 🛠️ Instalación y Configuración

### 1️⃣ Clonar el Repositorio

```sh
 git clone https://github.com/tuusuario/gestor-tareas.git
 cd gestor-tareas
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

## ✨ Contribuir

1. Haz un fork del repositorio.
2. Crea una rama nueva (`git checkout -b feature-nueva-funcionalidad`).
3. Realiza cambios y haz un commit (`git commit -m "Agregada nueva funcionalidad"`).
4. Envía un pull request.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. ¡Siéntete libre de usarlo y mejorarlo! 🚀
