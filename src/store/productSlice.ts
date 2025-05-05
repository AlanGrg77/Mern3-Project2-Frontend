import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IProductState, Review } from "../pages/product/types/productType";
import axios from "axios";
import { Status } from "../globals/types/authType";

const initialState:IProductState = {
    products: [],
    status : null,
    error : null,
    product : null
}

export const fetchAllProducts = createAsyncThunk<IProduct[],void,{rejectValue : string}>(
    'product/fetchAllProducts',
    async (_,thunkAPI) =>{
        try {
            const response = await axios.get('http://localhost:3000/api/product')
            return response.data.data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message)
        }
    }
)

export const fetchSingleProduct = createAsyncThunk<IProduct,string,{rejectValue : string}>(
    'product/fetchSingleProduct',
    async (id,thunkAPI)=>{
        try {
            console.log(id)
            const response = await axios.get("http://localhost:3000/api/product/" + id)
            return response.data.data
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message)
        }
    }
)

export const submitReview = createAsyncThunk<IProduct,{ productId: string | undefined; review: Review },{rejectValue:string}>(
    "product/submitReview",
    async ({ productId, review } ,thunkAPI) => {
      // Validate productId
      if (!productId) {
        throw new Error("Product ID is required");
      }
  
      try {
        const response = await axios.post(
          `http://localhost:3000/api/product/${productId}/reviews`,
          review,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        return response.data.data; // Assuming response.data contains the updated product or review info
      } catch (error:any) {
        return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
    }
  );

const productSlice = createSlice({
    name : 'product',
    initialState,
    reducers : {
        setProduct:(state,action:PayloadAction<IProduct>)=>{
            state.product = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchAllProducts.pending,(state)=>{
            state.status = Status.Loading
        })
        .addCase(fetchAllProducts.fulfilled,(state,action)=>{
            state.status = Status.Success,
            state.products = action.payload
        })
        .addCase(fetchAllProducts.rejected, (state,action)=>{
            state.status = Status.Error
            state.error = action.payload || "Error"
        })
        .addCase(fetchSingleProduct.pending,(state)=>{
            state.status = Status.Loading
        })
        .addCase(fetchSingleProduct.fulfilled,(state,action)=>{
            state.status = Status.Success,
            state.product = action.payload
        })
        .addCase(fetchSingleProduct.rejected, (state,action)=>{
            state.status = Status.Error
            state.error = action.payload || "Error"
        })
        .addCase(submitReview.pending, (state) => {
            state.status= Status.Loading;
          })
          .addCase(submitReview.fulfilled, (state, action) => {
            state.status = Status.Success ;
            // Add the updated product to the state
            const updatedProduct = action.payload;
            const index = state.products.findIndex((product) => product.id === updatedProduct.id);
            if (index !== -1) {
              state.products[index] = updatedProduct;
            }
          })
          .addCase(submitReview.rejected, (state,action)=>{
            state.status = Status.Error
            state.error = action.payload || "Error"
        })
    },
})

export const {setProduct} = productSlice.actions

export default productSlice.reducer