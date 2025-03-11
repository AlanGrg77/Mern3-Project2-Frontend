import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Status } from "../globals/types/authType";

interface IProduct{
    productId : string,
    productQty : number, 
}
export interface IOrderItems extends IProduct{
  orderId : string
}

interface IOrderData{
    firstName : string,
    lastName : string, 
    email : string,
    phoneNumber : string,
    city: string, 
    state : string, 
    zipCode : string, 
    addressLine : string,
    totalAmount : number,
    products : IProduct[],
    paymentMethod : PaymentMethod
}
// "firstName" : "Alan9", 
//     "lastName" : "Grg", 
//     "email" : "adam@gmail.com",
//     "phoneNumber" : "1234567894",
//     "city": "Bharatpur", 
//     "state" : "Bagmati", 
//     "zipCode" : 123, 
//     "addressLine" : "Chitwan",
//     "totalAmount" : 180,
//     "products" : [{
//         "productId" : "83101597-74bc-4958-95c1-1c44acf6bac0",
//         "productQty" : 5 

//     },
//     {
//         "productId" : "2626268d-a2d0-49c3-88f5-d109c9dd5ed4",
//         "productQty" : 6
//     }
//     ],
//     "paymentMethod" : "cod"
// }
interface IinitialCState{
    checkoutItems : IOrderItems[],
    khaltiUrl : string | null,
    status : string | null,
    error : string | null
}
export enum PaymentMethod{
    Khalti = "khalti",
    Esewa = "esewa",
    Cod = "cod"
}

const initialState:IinitialCState ={
    checkoutItems : [],
    khaltiUrl : null,
    status : null,
    error : null
}



export const handleCheckout = createAsyncThunk<{data : IOrderItems[] , url? : string},IOrderData, { rejectValue: string }>(
    'checkout/handleCheckout',
    async (submitData,thunkAPI) =>{
        try{
        const response = await axios.post(
            "http://localhost:3000/api/order", submitData,
            {
              headers: {
                Authorization: localStorage.getItem("userToken"),
              },
            }
          );
          return {
            data : response.data.data,
            url : response.data.url || undefined
          };
        }catch (error: any) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        }

    }
)



const checkoutSlice = createSlice({
    name : "checkout",
    initialState,
    reducers : {},
    extraReducers(builder) {
        builder
        .addCase(handleCheckout.pending, (state) => {
                state.status = Status.Loading;
                state.error = null;
              })
              .addCase(handleCheckout.fulfilled, (state, action) => {
                state.status = Status.Success, 
                state.checkoutItems = action.payload.data,
                state.khaltiUrl = action.payload.url || null;
                
              })
              .addCase(handleCheckout.rejected, (state, action:PayloadAction<string | undefined >) => {
                 state.status = Status.Error,
                  state.error = action.payload || "Error"
              })
    },
})

export default checkoutSlice.reducer