import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPost } from '../Api/requests';

const initialState = {
  post: null,
  loading: false,
  error: null,
};

export const fetchPostById = createAsyncThunk(
  'post/fetchPostById',
  async (id, thunkAPI) => {
    try {
      const data = await getPost(id);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.post = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;