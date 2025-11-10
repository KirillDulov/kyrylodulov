import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {}
};

const reduxFormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { setFormData } = reduxFormSlice.actions;
export default reduxFormSlice.reducer;