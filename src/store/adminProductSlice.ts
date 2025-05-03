import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/authType";
import axios from "axios";
import { IProductModal } from "../pages/admin/product/components/ProductModal";

export interface IProductAdmin{
    id : string, 
    productName : string, 
    productPrice : number, 
    productTotalStock : number, 
    productDescription : string, 
    productImageUrl : string, 
    createAt : string, 
    categoryId : string
    discount : number, 

    Category : {
        categoryName : string
    }
}

interface IInitialState{
    products : IProductAdmin[], 
    status : Status | null, 
    error : string | null
}
const initialState:IInitialState = {
    products : [], 
    status : null, 
    error : null
}

export const fetchProducts = createAsyncThunk<IProductAdmin[], void, {rejectValue : string}>(
    'admin/fetchProducts',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:3000/api/product",
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
export const addProduct = createAsyncThunk<IProductAdmin, IProductModal, {rejectValue : string}>(
    'admin/addProduct',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:3000/api/product",data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                         "Content-Type" : "multipart/form-data"
                    }
                }
            )
            return response.data.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message)
        }

    }
)

export const deleteProduct = createAsyncThunk<string, string, { rejectValue: string }>(
    "admin/deleteProduct",
    async (id, thunkAPI) => {
        try {
            await axios.delete("http://localhost:3000/api/product/" + id,
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

const productSlice = createSlice({
    name : "adminProducts", 
    initialState, 
    reducers : {
        resetStatusAdmin(state){
            state.status = null
        } 
    },
    extraReducers(builder) {
        builder .addCase(fetchProducts.pending, (state) => {
                    state.status = Status.Loading;
                })
                    .addCase(fetchProducts.fulfilled, (state, action) => {
                        (state.status = Status.Success)
                        state.products = action.payload;
                    })
                    .addCase(fetchProducts.rejected, (state, action) => {
                        (state.status = Status.Error),
                            (state.error = action.payload || "Error");
                    })
                    .addCase(addProduct.pending, (state) => {
                        state.status = Status.Loading;
                    })
                        .addCase(addProduct.fulfilled, (state, action) => {
                            (state.status = Status.Success)
                            state.products.push(action.payload);
                        })
                        .addCase(addProduct.rejected, (state, action) => {
                            (state.status = Status.Error),
                                (state.error = action.payload || "Error");
                        })
                        .addCase(deleteProduct.pending, (state) => {
                                        state.status = Status.Loading;
                                    })
                                    .addCase(deleteProduct.fulfilled, (state, action) => {
                                        (state.status = Status.Success)
                                        const index = state.products.findIndex((i)=> i.id === action.payload)
                                        if(index !== -1){
                                            state.products.splice(index,1)
                                        }
                                        
                                    })
                                    .addCase(deleteProduct.rejected, (state, action) => {
                                        (state.status = Status.Error),
                                            (state.error = action.payload || "Error");
                                    })
    },
})

export const {resetStatusAdmin} = productSlice.actions
export default productSlice.reducer 
