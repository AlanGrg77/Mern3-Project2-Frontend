import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "../globals/types/authType";
import axios from "axios";

export interface IUser {
    id: string,
    username: string,
    email: string
}

interface IInitialState {
    users: IUser[],
    status: Status | null,
    error: string | null
}

const initialState: IInitialState = {
    users: [],
    status: null,
    error: null
}

export const fetchUsers = createAsyncThunk<IUser[], void, { rejectValue: string }>(
    "admin/fecthUsers",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:3000/api/auth/users",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return response.data.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }

    }
)
export const deleteUsers = createAsyncThunk<string, string, { rejectValue: string }>(
    "admin/deleteUsers",
    async (id, thunkAPI) => {
        try {
            await axios.delete("http://localhost:3000/api/auth/users/" + id,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return id
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }

    }
)

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = Status.Loading;
        })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                (state.status = Status.Success)
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                (state.status = Status.Error),
                    (state.error = action.payload || "Error");
            })
            .addCase(deleteUsers.pending, (state) => {
                state.status = Status.Loading;
            })
            .addCase(deleteUsers.fulfilled, (state, action) => {
                (state.status = Status.Success)
                const index = state.users.findIndex((i)=> i.id === action.payload)
                if(index !== -1){
                    state.users.splice(index,1)
                }
                
            })
            .addCase(deleteUsers.rejected, (state, action) => {
                (state.status = Status.Error),
                    (state.error = action.payload || "Error");
            })
    }
})

export default userSlice.reducer