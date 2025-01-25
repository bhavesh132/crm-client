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

export const createContact = createAsyncThunk(
  'contacts/createContact',
  async (newContactData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/customer/contact/', newContactData);
      return response.data; 
    } catch (err) {
      return rejectWithValue(err.response.data);  
    }
  }
);

export const getContactDetails = createAsyncThunk(
    'customer/getContactDetail',
    async (id) => {
        const request = await axiosInstance.get(`customer/contact/${id}/`)
        const response = await request.data
        return response
    }
)


export const updateContact = createAsyncThunk(
    'contacts/updateContact',
     async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/customer/contact/${id}/`, data);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    })

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
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
            .addCase(createContact.pending, (state) => {
                state.loading = true;
            })
            .addCase(createContact.fulfilled, (state, action) => {
                state.loading = false;
                state.contactDetail = action.payload;
            })
            .addCase(createContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { setLoading } = contactSlice.actions

export default contactSlice.reducer