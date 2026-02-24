import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Не вдалося отримати користувачів");
            return res.json();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState: { items: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => { state.loading = true; })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default usersSlice.reducer;