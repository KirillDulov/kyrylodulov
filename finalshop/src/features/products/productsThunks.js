import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsApi } from '../../services/fakeApi';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async () => {
    return await fetchProductsApi();
  }
);