import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
  },
});

export const { addCustomer } = formSlice.actions;
export default formSlice.reducer;
