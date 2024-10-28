import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user
}

export const globalSlice = createSlice({
    initialState,
    name: 'global',
    reducers: {
    }
})


export default globalSlice.reducer