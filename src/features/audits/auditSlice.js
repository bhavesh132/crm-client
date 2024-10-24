import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/utils";

export const getRecentActivity = createAsyncThunk(
    'auditLogs/recents',
    async () => {
        const request = await axiosInstance.get(`auth/get_logs/`)
        const response = await request.data
        console.log(response)
        return response
    }
)

export const getInstaceDetail = createAsyncThunk(
    'auditLogs/instanceDetails',
    async (app_label, model_name, object_id) => {
        const request = await axiosInstance.get(`auth/instance-detail/${app_label}/${model_name}/${object_id}/`)
        const response = await request.data
        return response
    }
)


const initialState = {
    loading: true,
    recentActivity: null,
    instance: null,
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
            .addCase(getRecentActivity.pending, (state) => {
                state.loading = true
            })
            .addCase(getRecentActivity.fulfilled, (state, action) => {
                state.loading = false
                state.recentActivity = action.payload
            })
            .addCase(getRecentActivity.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isError = true
            })
            .addCase(getInstaceDetail.pending, (state) => {
                state.loading = true
            })
            .addCase(getInstaceDetail.fulfilled, (state, action) => {
                state.loading = false
                state.instance = action.payload
            })
            .addCase(getInstaceDetail.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isError = true
            })
    }
})