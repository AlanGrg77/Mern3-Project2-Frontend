import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { IOrderDetail, PaymentMethod, PaymentStatus } from "./checkoutSlice";
import { Status } from "../globals/types/authType";
import axios from "axios";
export interface IAdminOrder{
    id : string,
    productQty : number, 
    orderStatus? : string, 
    totalAmount?:number, 
    Payment? : {
        paymentMethod : PaymentMethod,
        paymentStatus : PaymentStatus 
        
    }
}
interface IInitialState{
    items : IAdminOrder[], 
    status : Status | null, 
    orderDetails : IOrderDetail[],
    error : string | null
}
const initialState:IInitialState = {
    status : null,
    items : [], 
    orderDetails : [],
    error : null
}
export const fetchOrders = createAsyncThunk<IAdminOrder[],void,{rejectValue : string}>(
    "admin/fetchOrders",
    async (_,thunkAPI) => {
        try{
            const response = await axios.get(
                "http://localhost:3000/api/order/all",
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
export const fetchAdminOrderDetails= createAsyncThunk<IOrderDetail[],string, { rejectValue: string }>(
    'checkout/fetchAdminOrderDetails',
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


const orderSlice = createSlice({
    name : "adminOrders", 
    initialState, 
    reducers : {

        // updateOrderStatusToCancel(state:IOrder, action: PayloadAction<{orderId:string}>){
        //     const orderId = action.payload.orderId
        //     // state.items.map((item)=>item.)
        //     // console.log(state.items,"ST")
        //     // const data =  state.orderDetails.map((order)=>order.orderId == orderId ? {...order, [order.Order.orderStatus] : OrderStatus.Cancelled} : order)
        //     const datas = state.orderDetails.find((order)=>order.orderId === orderId)
        //     datas ? datas.Order.orderStatus = OrderStatus.Cancelled : ""
        //     // state.orderDetails = data
           
        // }
    },
    extraReducers(builder) {
        builder.addCase(fetchOrders.pending, (state) => {
                            state.status = Status.Loading;
                        })
                            .addCase(fetchOrders.fulfilled, (state, action) => {
                                (state.status = Status.Success)
                                state.items = action.payload;
                            })
                            .addCase(fetchOrders.rejected, (state, action) => {
                                (state.status = Status.Error),
                                    (state.error = action.payload || "Error");
                            })
                            .addCase(fetchAdminOrderDetails.pending, (state) => {
                                            state.status = Status.Loading;
                                            state.error = null;
                                          })
                                          .addCase(fetchAdminOrderDetails.fulfilled, (state, action) => {
                                            state.status = Status.Success, 
                                            state.orderDetails = action.payload
                                          })
                                          .addCase(fetchAdminOrderDetails.rejected, (state, action:PayloadAction<string | undefined >) => {
                                             state.status = Status.Error,
                                              state.error = action.payload || "Error"
                                          })
    },
})

export default orderSlice.reducer




// export function cancelOrderAPI(id:string){
//     return async function cancelOrderAPIThunk(dispatch:AppDispatch){
//         try {
//             const response =  await APIWITHTOKEN.patch("/order/cancel-order/" + id)
//             if(response.status === 200){
//                 dispatch(setStatus(Status.SUCCESS))
//                 dispatch(updateOrderStatusToCancel({orderId : id}))
//             }else{
//                 dispatch(setStatus(Status.ERROR))
//             }
//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(Status.ERROR))
            
//         }
//     }
// }