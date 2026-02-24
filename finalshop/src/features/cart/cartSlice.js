import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  favoriteItems: []
};

const calculateTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const itemId = String(item.id || item._id);

      const existing = state.items.find(i => i.id === itemId);

      if (existing) {
        existing.quantity++;
      } else {
        state.items.push({
          id: itemId,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1
        });
      }

      state.totalPrice = calculateTotal(state.items);
    },

    removeFromCart(state, action) {
      const id = String(action.payload);
      state.items = state.items.filter(i => i.id !== id);
      state.totalPrice = calculateTotal(state.items);
    },

    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    increaseQuantity(state, action) {
      const id = String(action.payload);
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity++;
        state.totalPrice = calculateTotal(state.items);
      }
    },

    decreaseQuantity(state, action) {
      const id = String(action.payload);
      const item = state.items.find(i => i.id === id);
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity--;
      } else {
        state.items = state.items.filter(i => i.id !== id);
      }

      state.totalPrice = calculateTotal(state.items);
    },

    addToFavorites(state, action) {
      const item = action.payload;
      const itemId = String(item.id || item._id);

      if (!state.favoriteItems.find(i => String(i.id) === itemId)) {
        state.favoriteItems.push({
          id: itemId,
          name: item.name,
          price: item.price,
          image: item.image
        });
      }
    },

    removeFromFavorites(state, action) {
      const id = String(action.payload);
      state.favoriteItems = state.favoriteItems.filter(i => String(i.id) !== id);
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  addToFavorites,
  removeFromFavorites
} = cartSlice.actions;

export default cartSlice.reducer;