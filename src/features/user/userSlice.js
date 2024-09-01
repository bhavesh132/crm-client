import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { axiosInstance } from "../../lib/utils";
import Cookies from "js-cookie";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials) => {
        const request = await axiosInstance.post(`auth/login/`, userCredentials)
        const response = await request.data
        localStorage.setItem('user', JSON.stringify(response.user))
        localStorage.setItem('token', JSON.stringify(response.token))
        // console.log(response)
        const authToken = response.token;
        Cookies.set('auth_token', authToken, { sameSite: 'Lax', secure: true });
        return response
    }
)

export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        const request = await axiosInstance.post(`auth/logout/`, {}, {
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
        const response = await request.data
        Cookies.remove('auth_token')
        return response
    }
)


const initialState = {
    user: null,
    isAuthenticated: false,
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
                state.isAuthenticated = true
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
                state.isAuthenticated = false
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