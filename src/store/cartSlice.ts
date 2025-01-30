import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Status } from "../globals/types/authType";

interface ICartProduct {
  id: string | null;
  productName: string;
  productPrice: number | null;
  productImageUrl: string | null;
}

interface ICartItems {
  id: string | null;
  quantity: number | null;
  userId: string | null;
  productId: string | null;
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
  // [
  //     {
  //         "id": "6d838f03-2949-42ac-a208-0da51fb45f86",
  //         "quantity": 1,
  //         "userId": "2f75e244-2dff-493d-9394-e03077eefb0d",
  //         "productId": "83101597-74bc-4958-95c1-1c44acf6bac0",
  //         "createdAt": "2025-01-30T11:20:47.126Z",
  //         "updatedAt": "2025-01-30T11:20:47.126Z",
  //         "product": {
  //             "id": "83101597-74bc-4958-95c1-1c44acf6bac0",
  //             "productName": "Iphone5",
  //             "productPrice": 1300,
  //             "productImageUrl": "1738147589332-images.jpeg"
  //         }
  //     }
  // ]
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
          Authorization: localStorage.getItem("userToken"),
        },
      }
    );
    return response.data.data;
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
        (state.status = Status.Success), (state.cartItems = action.payload);
      })
      .addCase(createCart.rejected, (state, action) => {
        (state.status = Status.Error),
          (state.error = action.payload || "Error");
      });
  },
});

export default cartSlice.reducer;
