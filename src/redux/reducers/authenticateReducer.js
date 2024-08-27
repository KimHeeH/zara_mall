import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  id: "",
  password: "",
  authenticate: false,
};

const authenticateSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.password = action.payload.password;
      state.authenticate = true;
    },
    logout: (state, action) => {
      state.authenticate = false;
    },
  },
});
export const authenticateActions = authenticateSlice.actions;
export default authenticateSlice.reducer;
