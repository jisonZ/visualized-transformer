// action - state management
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isDirty: false,
  chatflow: null,
  canvasDialogShow: false,
  componentNodes: [],
  componentCredentials: [],
};

// ==============================|| CANVAS REDUCER ||============================== //

const canvasReducer = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setDirty: (state) => {
      state.isDirty = true;
    },
    removeDirty: (state) => {
      state.isDirty = false;
    },
    setChatflow: (state, action) => {
      state.chatflow = action.payload;
    },
    showCanvasDialog: (state) => {
      state.canvasDialogShow = true;
    },
    hideCanvasDialog: (state) => {
      state.canvasDialogShow = false;
    },
    setComponentNodes: (state, action) => {
      state.componentNodes = action.payload;
    },
    setComponentCredentials: (state, action) => {
      state.componentCredentials = action.payload;
    },
  },
});

export const {
  setDirty,
  removeDirty,
  setChatflow,
  showCanvasDialog,
  hideCanvasDialog,
  setComponentNodes,
  setComponentCredentials,
} = canvasReducer.actions;

export default canvasReducer.reducer;