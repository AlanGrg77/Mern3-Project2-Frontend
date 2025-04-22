import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Status } from "../globals/types/authType";

interface ICartProduct {
  id: string 
  productName: string
  productPrice: number
  productImageUrl: string 
}

interface ICartItems {
  id: string 
  quantity: number 
  userId: string 
  productId: string 
  product: ICartProduct;
}

interface ICartState {
  cartItems: ICartItems[];
  status: string | null;
  error: string | null;
}

const initialState: ICartState = {
  cartItems: [],
  status: null,
  error: null,
};

export const createCart = createAsyncThunk<
  ICartItems[],
  string,
  { rejectValue: string }>(
    "cart/createCart", 
    async (id, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/cart",
      { productId: id, quantity: 1 },
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

export const fetchCart = createAsyncThunk<
  ICartItems[],
  void,
  { rejectValue: string }>(
    "cart/fetchCart", 
    async (_, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/cart",
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



export const updateCart = createAsyncThunk<
{productId:string,quantity:number},
  {productId:string,quantity:number},
  { rejectValue: string }>(
    "cart/updateCart", 
    async ({productId,quantity}, thunkAPI) => {
  try {
     await axios.patch(
      `http://localhost:3000/api/cart/${productId}`,
      {
        quantity
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return {productId,quantity}
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const deleteCart = createAsyncThunk<
  string,
  string,
  { rejectValue: string }>(
    "cart/deleteCart", 
    async (productId, thunkAPI) => {
  try {
     await axios.delete(
      `http://localhost:3000/api/cart/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return productId
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createCart.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        (state.status = Status.Success), 
        (state.cartItems = action.payload);
      })
      .addCase(createCart.rejected, (state, action) => {
        (state.status = Status.Error),
          (state.error = action.payload || "Error");
      })
      .addCase(updateCart.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        (state.status = Status.Success) 
        const index = state.cartItems.findIndex((c)=>c.product.id === action.payload.productId)
        if(index !== -1){
          state.cartItems[index].quantity = action.payload.quantity
        }
      })
      .addCase(updateCart.rejected, (state, action) => {
        (state.status = Status.Error),
          (state.error = action.payload || "Error");
      })
      .addCase(deleteCart.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        (state.status = Status.Success) 
        const index = state.cartItems.findIndex((c)=>c.product.id === action.payload)
        if(index !== -1){
          state.cartItems.splice(index,1)
        }
      })
      .addCase(deleteCart.rejected, (state, action) => {
        (state.status = Status.Error),
          (state.error = action.payload || "Error");
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload
      })
      .addCase(fetchCart.rejected, (state, action) => {
        (state.status = Status.Error),
          (state.error = action.payload || "Error");
      });
  },
});

export default cartSlice.reducer;
