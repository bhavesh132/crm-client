import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../user/authslice";
import contactReducer from "../contacts/contactSlice";
import paginationReducer from "../generics/paginationSlice"
import auditReducer from "../audits/auditSlice"
import globalReducer from "../global/globalSlice"
import filterReducer from "../generics/filterSlice"
import ticketsReducer from "../tickets/ticketSlice"
import UserReducer from "../user/userSlice"

export const store = configureStore({
    reducer: {
        global: globalReducer,
        user: UserReducer,
        auth: authSlice,
        contact: contactReducer,
        pagination: paginationReducer,
        audit: auditReducer,
        filter: filterReducer,
        ticket: ticketsReducer
    }
})