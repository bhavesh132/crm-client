import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../lib/utils";
import Cookies from "js-cookie";


export const getDashboardData = createAsyncThunk(
    'dashboard/data',
    async () => {
        const request = await axiosInstance.get(`features/dashboard`)
        const response = await request.data
        return response
    }
)
export const getTotalData = createAsyncThunk(
    'dashboard/total_data',
    async () => {
        const request = await axiosInstance.get(`features/total_data`)
        const response = await request.data
        return response
    }
)

const initialState = {
    loading: true,
    data: null,
    totalData: null,
    error: null,
    isError: false
}


export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardData.pending, (state) => {
                state.loading = true
            })
            .addCase(getDashboardData.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(getDashboardData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isError = true
            })
            .addCase(getTotalData.pending, (state) => {
                state.loading = true
            })
            .addCase(getTotalData.fulfilled, (state, action) => {
                state.loading = false
                state.totalData = action.payload
            })
            .addCase(getTotalData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isError = true
            })
    }
})

export default dashboardSlice.reducer