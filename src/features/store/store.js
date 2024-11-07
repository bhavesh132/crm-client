import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../user/userSlice'
import contactReducer from "../contacts/contactSlice";
import paginationReducer from "../generics/paginationSlice"
import auditReducer from "../audits/auditSlice"
import globalReducer from "../global/globalSlice"
import filterReducer from "../generics/filterSlice"
import ticketsReducer from "../tickets/ticketSlice"

export const store = configureStore({
    reducer: {
        global: globalReducer,
        user: userReducer,
        contact: contactReducer,
        pagination: paginationReducer,
        audit: auditReducer,
        filter: filterReducer,
        ticket: ticketsReducer
    }
})