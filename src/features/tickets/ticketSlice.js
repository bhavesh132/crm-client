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
    async (args, { getState }) => {
        const { filter, pagination } = getState();
        const { pageSize, currentPage } = pagination
        const { orderBy, filters } = filter;
        const request = await axiosInstance.get(`service/ticket/`, {
            params: {
                page_size: pageSize,
                page: currentPage,
                order_by: orderBy,
                ...filters,
                ...args
            }
        })
        const response = request.data
        return response
    }
)

export const getTicketbyId = createAsyncThunk(
    'service/getTicketDetails',
    async (id, { getState }) => {
        const request = await axiosInstance.get(`service/ticket/${id}/`)
        const response = request.data
        return response
    }
)



export const ticketSlice = createSlice({
    initialState,
    name: 'ticket',
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        }
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
            .addCase(getTicketbyId.pending, (state) => {
                state.loading = true
            })
            .addCase(getTicketbyId.fulfilled, (state, action) => {
                state.ticketDetail = action.payload
                state.loading = false
            })
            .addCase(getTicketbyId.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
                state.isError = true
            })
    }
})


export const { setLoading } = ticketSlice.actions

export default ticketSlice.reducer

