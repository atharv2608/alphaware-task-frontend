import { createSlice } from "@reduxjs/toolkit";

//status: login status of user
//userdata: data of the user
//role: user role
const initialState = {
  status: false,
  userData: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //fills up data
    login: (state, action) => {
      (state.status = true), 
      state.userData = action.payload
      state.role = action.payload.role;
    },

    //logout clears all the data
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;