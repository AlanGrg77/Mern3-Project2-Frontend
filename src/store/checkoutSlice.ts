import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Status } from "../globals/types/authType";

interface IProduct{
  productId : string, 
  productQty : number, 
  orderStatus? : string, 
  totalAmount?:number, 
  Payment? : {
      paymentMethod : PaymentMethod, 
      
  }
}
export interface IOrderItems extends IProduct{
  id : string,
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
export enum PaymentStatus{
  Paid = "paid", 
  Unpaid = "unpaid"
}
export enum OrderStatus{
  Preparation = "preparation", 
  Ontheway = "ontheway", 
  Delivered = "delivered", 
  Pending = "pending", 
  Cancelled = "cancelled"
}
export interface IOrderDetail {
  id: string,
  quantity: number,
  createdAt: string,

  orderId: string,
  productId: string,
  order: {
      orderStatus: OrderStatus,
      addressLine: string,
      city: string,
      state: string,
      totalAmount: number,
      phoneNumber: string,
      firstName : string, 
      lastName : string, 
      userId : string,
      Payment: {
          paymentMethod: PaymentMethod,
          paymentStatus: PaymentStatus
      }
  },
  product: {
      productImageUrl: string,
      productName: string,
      productPrice: number,
      Category: {

          categoryName: string,

      }
  }
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
interface IformData {
  amount: string,
  failure_url: string,
  product_delivery_charge: string,
  product_service_charge: string,
  product_code: string,
  signature: string,
  signed_field_names: string,
  success_url: string,
  tax_amount: string,
  total_amount : string,
  transaction_uuid: string
}
interface IinitialCState{
    items : IOrderItems[],
    orderDetails : IOrderDetail[],
    khaltiUrl : string | null,
    esewaFormData : IformData | null,
    fetchStatus: null | 'loading' | 'success' | 'error',
    checkoutStatus: null | 'loading' | 'success' | 'error',
    error : string | null
}
export enum PaymentMethod{
    Khalti = "khalti",
    Esewa = "esewa",
    Cod = "cod"
}

const initialState:IinitialCState ={
    items : [],
    orderDetails : [],
    khaltiUrl : null,
    esewaFormData : null,
    fetchStatus: null,
    checkoutStatus: null,
    error : null
}



export const handleCheckout = createAsyncThunk<{data : IOrderItems[] , url? : string, esewaFormData? : IformData},IOrderData, { rejectValue: string }>(
    'checkout/handleCheckout',
    async (submitData,thunkAPI) =>{
        try{
        const response = await axios.post(
            "http://localhost:3000/api/order", submitData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              },
            }
          );
          return {
            data : response.data.data,
            url : response.data.url || undefined,
            esewaFormData : response.data.EsewaformData || undefined
          };
        }catch (error: any) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        }

    }
)

export const fetchMyOrder= createAsyncThunk<IOrderItems[],void, { rejectValue: string }>(
  'checkout/fetchMyOrder',
  async (_,thunkAPI) =>{
      try{
      const response = await axios.get(
          "http://localhost:3000/api/order",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        return response.data.data
      }catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }

  }
)
export const fetchMyOrderDetails= createAsyncThunk<IOrderDetail[],string, { rejectValue: string }>(
  'checkout/fetchMyOrderDetails',
  async (id,thunkAPI) =>{
      try{
      const response = await axios.get(
          "http://localhost:3000/api/order/"+id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        return response.data.data
      }catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }

  }
)

export const cancelOrderAPI= createAsyncThunk<string,string, { rejectValue: string }>(
  'checkout/cancelOrderAPI',
  async (id,thunkAPI) =>{
      try{
      await axios.patch(
          "http://localhost:3000/api/order/cancel-order/"+id,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        return id
        
      }catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
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
                state.checkoutStatus = Status.Loading;
                state.error = null;
              })
              .addCase(handleCheckout.fulfilled, (state, action) => {
                state.checkoutStatus = Status.Success, 
                state.items = action.payload.data,
                state.khaltiUrl = action.payload.url || null,
                state.esewaFormData = action.payload.esewaFormData || null
                
              })
              .addCase(handleCheckout.rejected, (state, action:PayloadAction<string | undefined >) => {
                 state.checkoutStatus = Status.Error,
                  state.error = action.payload || "Error"
              })
              .addCase(fetchMyOrder.pending, (state) => {
                state.fetchStatus = Status.Loading;
                state.error = null;
              })
              .addCase(fetchMyOrder.fulfilled, (state, action) => {
                state.fetchStatus = Status.Success, 
                state.items = action.payload
              })
              .addCase(fetchMyOrder.rejected, (state, action:PayloadAction<string | undefined >) => {
                 state.fetchStatus = Status.Error,
                  state.error = action.payload || "Error"
              })
              .addCase(fetchMyOrderDetails.pending, (state) => {
                state.fetchStatus = Status.Loading;
                state.error = null;
              })
              .addCase(fetchMyOrderDetails.fulfilled, (state, action) => {
                state.fetchStatus = Status.Success, 
                state.orderDetails = action.payload
              })
              .addCase(fetchMyOrderDetails.rejected, (state, action:PayloadAction<string | undefined >) => {
                 state.fetchStatus = Status.Error,
                  state.error = action.payload || "Error"
              })
              .addCase(cancelOrderAPI.fulfilled, (state, action) => {
                const orderId = action.payload;
                const datas = state.orderDetails.find((order)=>order.orderId === orderId)
                datas ? datas.order.orderStatus = OrderStatus.Cancelled : ""

             })
    },
})

export default checkoutSlice.reducer