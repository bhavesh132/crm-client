import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/utils";

const initialState = {
    loading: true,
    data: null,
    contactDetail: null,
    error: null,
    isError: false,
    totalCount: 0,
}

export const getAllContacts = createAsyncThunk(
    'customer/all_contacts',
    async (_, { getState }) => {
        const { filter, pagination } = getState(); // Access the 'contact' state directly
        const { pageSize, currentPage } = pagination
        const { orderBy, filters } = filter;

        const request = await axiosInstance.get(`customer/contact/`, {
            params: {
                page_size: pageSize,
                page: currentPage,
                order_by: orderBy,
                ...filters
            }
        })
        const response = await request.data

        return response
    }
)

export const getContactDetails = createAsyncThunk(
    'customer/getContactDetail',
    async (id) => {
        const request = await axiosInstance.get(`customer/contact/${id}/`)
        const response = await request.data
        return response
    }
)


export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllContacts.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllContacts.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.totalCount = action.payload.total_count
                state.loading = false
            })
            .addCase(getAllContacts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
                state.isError = true
            })
            .addCase(getContactDetails.pending, (state) => {
                state.loading = true
            })
            .addCase(getContactDetails.fulfilled, (state, action) => {
                state.contactDetail = action.payload
                state.loading = false
            })
            .addCase(getContactDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
                state.isError = true
            })
    }
})


export default contactSlice.reducer