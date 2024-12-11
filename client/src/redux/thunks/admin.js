import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
    try {
        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        }
        const { data } = await axios.post(`${server}/api/v1/admin/verify`,
            { secretKey },
            config
        )
    } catch (error) {
        throw error.response.data.message
    }

    return data.message
})

export {adminLogin}

