import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import GlobalApi from '../../GlobalApi'

export const userRegister = createAsyncThunk(
    'user/register',
    async (formData, { rejectWithValue }) => {
      try {
        const response = await GlobalApi.UserRegister(formData);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );

const RegisterSlice = createSlice({
    name: 'user',
    initialState: {
        loading:false,
        user:null,
        error:null,

    },
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(userRegister.pending, (state)=>{
            state.loading = true;
            state.user=null
            state.error=null
        })
        builder.addCase(userRegister.fulfilled, (state, action)=>{
            state.loading=false
            state.user=action.payload
        })
        builder.addCase(userRegister.rejected, (state,action)=>{
            state.loading=false
            state.error=action.payload ? action.payload : action.error.message
        })
    }
})

export default RegisterSlice.reducer