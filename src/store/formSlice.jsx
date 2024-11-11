import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // Action to add a new customer
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },

    // Action to add an item to a customer's order
    addItemToCustomer: (state, action) => {
      const { customerName, item } = action.payload;
      const customer = state.customers.find((c) => c.customerName === customerName);
      if (customer) {
        customer.items.push(item);
      }
    },

    // Action to update an item in the customer's order
    updateItem: (state, action) => {
      const { index, updatedItem } = action.payload;
      const customer = state.customers.find((c) => c.customerName === updatedItem.customerName);
      if (customer) {
        customer.items[index] = updatedItem;
      }
    },

    // Action to delete an item from the customer's order
    deleteItem: (state, action) => {
      const { customerName, index } = action.payload;
      const customer = state.customers.find((c) => c.customerName === customerName);
      if (customer && customer.items) {
        customer.items.splice(index, 1);
      }
    },
  },
});

// Export actions
export const { addCustomer, addItemToCustomer, updateItem, deleteItem } = formSlice.actions;

// Export the reducer
export default formSlice.reducer;
