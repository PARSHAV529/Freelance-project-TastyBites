import { createSlice } from "@reduxjs/toolkit";

// Initial state for the Redux store
const initialState = {
  customers: [], // Array to hold customer orders
};

// Redux slice for managing form data
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // Action to add a customer along with their items
    addCustomer: (state, action) => {
      const { customerName, items } = action.payload;
      const newCustomer = { customerName, items };
      state.customers.push(newCustomer);
    },
    // Action to add an item to an existing customer's order
    addItemToCustomer: (state, action) => {
      const { customerName, item } = action.payload;
      const customer = state.customers.find(
        (customer) => customer.customerName === customerName
      );

      if (customer) {
        customer.items.push(item);
      }
    },
  },
});

// Export actions to be used in components
export const { addCustomer, addItemToCustomer } = formSlice.actions;

// Export the reducer to be added to the store
export default formSlice.reducer;
