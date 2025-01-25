import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/utils";

const initialState = {
    loading: true,
    error: null,
    data: null,
    isError: false,
}

export const getAllUsers = createAsyncThunk(
    'user/allUsers',
    async () => {
        const request = await axiosInstance.get(`auth/users/`)
        const response = await request.data
        return response
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isError = true;
            })
    }
})


export default userSlice.reducer
