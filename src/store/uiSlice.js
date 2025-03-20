import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  modalTask: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalTask = action.payload || null; // Si se pasa una tarea, la asigna al modal
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalTask = null;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
