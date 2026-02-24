import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsApi, deleteProductApi, updateProductApi } from '../../services/fakeApi';

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await fetchProductsApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      await deleteProductApi(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      return await updateProductApi(id, updatedData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);