import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/utils";


export const getAllCompanies = createAsyncThunk(
    "company/getAllCompanies",
    async (_, { rejectWithValue, getState }) => {
        try {
            const { pagination, filter } = getState();
            const params = {
                page: pagination.currentPage,
                page_size: pagination.pageSize,
                order_by: filter.orderBy,
                ...filter.filters
            };
            const request = await axiosInstance.get(`customer/company/`, { params });
            const response = await request.data;
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createCompany = createAsyncThunk(
    "company/createCompany",
    async (companyData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/companies/`, companyData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateCompany = createAsyncThunk(
    "company/updateCompany",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/companies/${id}/`, updatedData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteCompany = createAsyncThunk(
    "company/deleteCompany",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/companies/${id}/`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const companySlice = createSlice({
    name: "company",
    initialState: {
        data: null,
        loading: false,
        isError: false,
        companyDetail: null,
        error: null,
        totalCount: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCompanies.pending, (state) => {
                state.loading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(getAllCompanies.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.totalCount = action.payload.total_count;
            })
            .addCase(getAllCompanies.rejected, (state, action) => {
                state.loading = false;
                state.isError = true;
                state.error = action.payload;
            })
            .addCase(createCompany.fulfilled, (state, action) => {
                state.data.unshift(action.payload);
            })
            .addCase(updateCompany.fulfilled, (state, action) => {
                const index = state.data.findIndex(company => company.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
            })
            .addCase(deleteCompany.fulfilled, (state, action) => {
                state.data = state.data.filter(company => company.id !== action.payload);
            });
    }
});

export default companySlice.reducer;
