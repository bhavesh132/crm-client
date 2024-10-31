import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/utils";

const initialState = {
    loading: true,
    error: null,
    data: null,
    ticketDetail: null,
    isError: false,

}

export const getAllTickets = createAsyncThunk(
    'service/allTickets',
    async (_, { getState }) => {
        const { filter, pagination } = getState(); // Access the 'contact' state directly
        const { pageSize, currentPage } = pagination
        const { orderBy, filters } = filter;
        const request = await axiosInstance.get(`service/ticket/`, {
            params: {
                page_size: pageSize,
                page: currentPage,
                order_by: orderBy,
                ...filters
            }
        })
        const response = request.data
        return response
    }
)



export const ticketSlice = createSlice({
    initialState,
    name: 'ticket',
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTickets.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllTickets.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.totalCount = action.payload.total_count
                state.loading = false
            })
            .addCase(getAllTickets.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
                state.isError = true
            })
    }
})



export default ticketSlice.reducer

