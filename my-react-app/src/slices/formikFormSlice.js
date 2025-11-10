import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {}
};

const formikFormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormFormikData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { setFormFormikData } = formikFormSlice.actions;
export default formikFormSlice.reducer;