import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GlobalApi from "../../GlobalApi";
import Cookies from 'js-cookie';


export const userLogin = createAsyncThunk(
    'user/login',
    async ( _, { rejectWithValue }) => {
        try {
            const response = await GlobalApi.GetUser()
            return response.data
        } catch (error) {
            console.log(error);
            
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null,
        isAuthenticated: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state)=>{
            state.loading = true;
            state.user = null;
            state.isAuthenticated = false;
            state.error = null
        })
        builder.addCase(userLogin.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        builder.addCase(userLogin.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload ? action.payload : action.error.message
        })
    }

})

export const {logout} = AuthSlice.actions;
export default AuthSlice.reducer