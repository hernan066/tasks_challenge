import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Obtener tareas desde la API
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch("/api/tasks");
  return response.json();
});

//Agregar una tarea
export const addTask = createAsyncThunk("tasks/addTask", async (taskData) => {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  return response.json();
});

//Actualizar una tarea
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (taskData) => {
    const response = await fetch(`/api/tasks/${taskData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    return response.json();
  }
);

//Eliminar una tarea
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  return id;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], loading: false, filter: "all", search: "" },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const { setFilter, setSearch } = taskSlice.actions;
export default taskSlice.reducer;
