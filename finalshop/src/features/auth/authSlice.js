import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser,
    isAuth: !!savedUser,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isAuth = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      console.log("LOGIN SUCCESS:", state.user);
    },
    logout(state) {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem("user");
      console.log("LOGOUT SUCCESS");
    },
    register(state, action) {
      state.user = action.payload.user;
      state.isAuth = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      console.log("REGISTER SUCCESS:", state.user);
    },
    updateUserProfile(state, action) {
      if (state.user) {
        state.user.username = action.payload.username;
        state.user.email = action.payload.email;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    }
  },
});

export const { login, logout, register, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;