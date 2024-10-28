import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderBy: "num_id",
    filters: {}
}

export const filterSlice = createSlice({
    initialState,
    name: 'filters',
    reducers: {
        setSortingParams: (state, action) => {
            state.orderBy = action.payload
        },
        setFilterParams: (state, action) => {
            const filterParams = { ...action.payload }
            if (Object.keys(action.payload).length === 0) {
                state.filters = {};  // Reset the filters
            }
            else {
                // Otherwise, merge the new filters with the current filters
                state.filters = { ...state.filters, ...filterParams }
            }

        }
    }
})


export const { setSortingParams, setFilterParams } = filterSlice.actions

export default filterSlice.reducer