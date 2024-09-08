import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/utils";


export const getAllContacts = createAsyncThunk(
    'customer/all_contacts',
    async () => {
        const request = await axiosInstance.get(`customer/contact/`)
        const response = await request.data
        return response
    }
)

const initialState = {
    loading: true,
    data: null,
    error: null,
    isError: false
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllContacts.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllContacts.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(getAllContacts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
                state.isError = true
            })
    }
})

export default contactSlice.reducer