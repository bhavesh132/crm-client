import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/features/user/authSlice";
import contactReducer from "../contacts/contactSlice";
import paginationReducer from "../generics/paginationSlice"
import auditReducer from "../audits/auditSlice"
import filterReducer from "../generics/filterSlice"
import ticketsReducer from "../tickets/ticketSlice"
import UserReducer from "../user/userSlice"
import companyReducer from "../companies/companySlice"

export const store = configureStore({
    reducer: {
        user: UserReducer,
        auth: authSlice,
        contact: contactReducer,
        pagination: paginationReducer,
        audit: auditReducer,
        filter: filterReducer,
        ticket: ticketsReducer,
        company: companyReducer
    }
})