import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { hostname, deleteAllCookies } from "../../lib/utils";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials) => {
        const request = await axios.post(`${hostname}auth/login/`, userCredentials, { withCredentials: true })
        const response = await request.data
        localStorage.setItem('user', JSON.stringify(response.user))
        return response
    }
)

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async (_, thunkApi) => {
        try {
            const response = await axios.post(`${hostname}auth/logout/`, user)
            return response.data
        } catch {
            thunkApi.rejectWithValue(error.response.data);
        }

    }
)


const initialState = {
    user: null,
    error: null,
    loading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
                state.user = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.user = null
            })

            .addCase(logoutUser.pending, (state) => {
                state.loading = true
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false
                state.error = null
                state.user = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default userSlice.reducer