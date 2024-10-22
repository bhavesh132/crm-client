import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../user/userSlice'
import dashboardReducer from '../dashboard/dashboardSlice'
import contactReducer from "../contacts/contactSlice";
import paginationReducer from "../generics/paginationSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        dashboard: dashboardReducer,
        contact: contactReducer,
        pagination: paginationReducer
    }
})