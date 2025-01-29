import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { Status } from "../globals/types/authType";

interface IUser{
    username : string | null,
    email : string | null,
    password : string | null
}

interface IAuthState{
    user : IUser[],
    status : Status
}

const initialState:IAuthState ={
    user : [],
    status : Status.Loading
}

export const fetchUsers = createAsyncThunk<IUser[],void>(
    'example/fetchUsers',
    async (_,thunkAPI) =>{
        try {
            const response = await axios.get('http://localhost:3000/api/auth/getUsers')
            return response.data.data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.message)
        }
    } 
)

const exampleSlice = createSlice({
    name : 'authExample',
    initialState,
    reducers : {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state) =>{
            state.status = Status.Loading
        })
        .addCase(fetchUsers.fulfilled, (state,action) =>{
            state.status = Status.Success
            state.user = action.payload
        })
        .addCase(fetchUsers.rejected, (state,action) =>{
            state.status = Status.Error
            console.error(action.payload)
        }) 
    },
})



export default exampleSlice.reducer