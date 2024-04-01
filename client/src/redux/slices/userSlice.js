import { createSlice } from "@reduxjs/toolkit";
import deleteCookie from "../../helpers/deleteCookie";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      user: {},
    },
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    onLogin: (state, action) => {
      state.loading = true;
    },
    onLoginSuccess: (state, action) => {
      state.loading = false;
      state.data.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    onLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    onLogout: (state) => {
      state.data.user = {};
      state.isAuthenticated = false;
      deleteCookie("token");
      deleteCookie("user");
    },
    onReload: (state, action) => {
      state.loading = true;
    },
    onReloadSuccess: (state, action) => {
      state.loading = false;
      state.data.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    onReloadFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  onLogin,
  onLoginSuccess,
  onLoginFailure,
  onLogout,
  onReload,
  onReloadSuccess,
  onReloadFailure,
} = userSlice.actions;

export default userSlice.reducer;
