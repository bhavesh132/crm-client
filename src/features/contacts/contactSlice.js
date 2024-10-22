import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/utils";

const initialState = {
    loading: true,
    data: null,
    error: null,
    isError: false,
    totalCount: 0,
    page: 1,
    pageSize: 50,
    orderBy: "num_id",
    filters: {}
}

export const getAllContacts = createAsyncThunk(
    'customer/all_contacts',
    async (_, { getState }) => {
        const { contact, pagination } = getState(); // Access the 'contact' state directly
        console.log(contact, pagination); // Log the entire contact state to verify
        const { pageSize, currentPage } = pagination
        const { orderBy, filters } = contact;

        const request = await axiosInstance.get(`customer/contact/`, {
            params: {
                page: currentPage,
                page_size: pageSize,
                order_by: orderBy,
                ...filters
            }
        })
        const response = await request.data

        return response
    }
)


export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setSortingParams: (state, action) => {
            state.orderBy = action.payload
        },
        setFilterParams: (state, action) => {
            const filterParams = { ...action.payload }
            if (Object.keys(action.payload).length === 0) {
                state.filters = {};  // Reset the filters
            } else {
                // Otherwise, merge the new filters with the current filters
                state.filters = { ...state.filters, ...filterParams }
            }

        }

    },
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
    }
})

export const { setSortingParams, setFilterParams } = contactSlice.actions

export default contactSlice.reducer