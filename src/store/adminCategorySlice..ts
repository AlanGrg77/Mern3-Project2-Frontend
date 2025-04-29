import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Status } from "../globals/types/authType";


interface ICategory {
    id: string,
    categoryName: string
}
interface ICategoryInitialState {
    items: ICategory[],
    status: Status | null,
    error :string | null
}

const initialState: ICategoryInitialState = {
    items: [],
    status: null,
    error : null
};

export const addCategory = createAsyncThunk<
    ICategory,
    string,
    { rejectValue: string }>(
        "category/addCategory",
        async (categoryName, thunkAPI) => {
            try {
                const response = await axios.post(
                    "http://localhost:3000/api/category",
                    { categoryName },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                        },
                    }
                );
                return response.data.data;
            } catch (error: any) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
        });

export const fetchCategory = createAsyncThunk<
    ICategory[],
    void,
    { rejectValue: string }>(
        "category/fetchCategory",
        async (_, thunkAPI) => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/category",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                        },
                    }
                );
                return response.data.data;
            } catch (error: any) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
        });



export const updateCategory = createAsyncThunk<
{ id: string, categoryName: string },
    { id: string, categoryName: string },
    { rejectValue: string }>(
        "category/updateCategory",
        async ({ id, categoryName }, thunkAPI) => {
            try {
                await axios.patch(
                    `http://localhost:3000/api/category/${id}`, { categoryName },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                        },
                    }
                );
                return {id,categoryName}
            } catch (error: any) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
        });

export const deleteCategory = createAsyncThunk<
    string,
    string,
    { rejectValue: string }>(
        "category/deleteCategory",
        async (id, thunkAPI) => {
            try {
                await axios.delete(
                    `http://localhost:3000/api/Category/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                        },
                    }
                );
                return id
            } catch (error: any) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
        });

const CategorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {
        resetStatus(state){
            state.status = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addCategory.pending, (state) => {
                state.status = Status.Loading;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                (state.status = Status.Success),
                    state.items.push(action.payload);
            })
            .addCase(addCategory.rejected, (state, action) => {
                (state.status = Status.Error),
                    (state.error = action.payload || "Error");
            })
            .addCase(updateCategory.pending, (state) => {
                state.status = Status.Loading;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                (state.status = Status.Success)
                const index = state.items.findIndex((c) => c.id === action.payload.id)
                if (index !== -1) {
                    state.items[index].categoryName = action.payload.categoryName
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                (state.status = Status.Error),
                    (state.error = action.payload || "Error");
            })
            .addCase(deleteCategory.pending, (state) => {
                state.status = Status.Loading;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                (state.status = Status.Success)
                const index = state.items.findIndex((c) => c.id === action.payload)
                if (index !== -1) {
                    state.items.splice(index, 1)
                }
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                (state.status = Status.Error),
                    (state.error = action.payload || "Error");
            })
            .addCase(fetchCategory.pending, (state) => {
                state.status = Status.Loading;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.items = action.payload
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                (state.status = Status.Error),
                    (state.error = action.payload || "Error");
            });
    },
});

export const {resetStatus} = CategorySlice.actions

export default CategorySlice.reducer;
