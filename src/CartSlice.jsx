import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      const existingPlant = state.items.find(i => i.name === plant.name);
      if (existingPlant) {
        existingPlant.quantity++;
      } else {
        state.items.push({ ...plant, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.name !== action.payload.name);
    },
    updateQuantity: (state, action) => {
      const plant = action.payload;
      const existingPlant = state.items.find(i => i.name === plant.name);
      if (existingPlant) {
        existingPlant.quantity = plant.quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
