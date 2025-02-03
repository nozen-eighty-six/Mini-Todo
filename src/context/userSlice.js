import { createSlice } from "@reduxjs/toolkit";

const initilizeState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initilizeState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
