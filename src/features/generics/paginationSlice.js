import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        pageSize: 50,
        currentPage: 1,
        totalCount: 0,
    },
    reducers: {
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
    },
});

export const { setPageSize, setCurrentPage, setTotalCount } = paginationSlice.actions;
export default paginationSlice.reducer;
