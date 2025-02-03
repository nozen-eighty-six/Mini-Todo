import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guest: {
    active: JSON.parse(window.localStorage.getItem("guest")) || false,
  },
};

const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    addGuest: (state) => {
      state.guest.active = true;
    },
    updateGuest: (state) => {
      state.guest.active = false;
    },
  },
});

export const { addGuest, updateGuest } = guestSlice.actions;
export default guestSlice.reducer;
