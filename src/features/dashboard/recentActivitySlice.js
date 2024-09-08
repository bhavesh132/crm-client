import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../lib/utils";
import Cookies from "js-cookie";

export const getRecentActivity = () => {

}

const initialState = {
    loading: true,
    data: null,
    error: null,
    isError: false
}

export const activitySlice = createSlice({
    name: 'activity',
    initialState
})