import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  doneOrders: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
    deleteItem: (state, action) => {
      const { customerName, index } = action.payload;
      const customer = state.customers.find((c) => c.customerName === customerName);
      if (customer) customer.items.splice(index, 1);
    },
    addItemToCustomer: (state, action) => {
      const { customerName, item } = action.payload;
      const customer = state.customers.find((c) => c.customerName === customerName);
      if (customer) customer.items.push(item);
    },
    markItemDone: (state, action) => {
      const { customerName, index } = action.payload;
      const customer = state.customers.find((c) => c.customerName === customerName);
      if (customer) customer.items[index].isDone = !customer.items[index].isDone;
    },
    completeOrder: (state, action) => {
      const { customerName } = action.payload;
      const customer = state.customers.find((c) => c.customerName === customerName);
      
      if (customer) {
        // Mark all items as done
        customer.items = customer.items.map(item => ({
          ...item,
          isDone: true,  // Mark each item as done
        }));

        // Move the customer to doneOrders
        state.doneOrders.push(customer);

        // Remove the customer from the customers list
        state.customers = state.customers.filter(c => c.customerName !== customerName);
      }
    },
  },
});

export const {
  addCustomer,
  deleteItem,
  addItemToCustomer,
  markItemDone,
  completeOrder,
} = formSlice.actions;
export default formSlice.reducer;
