import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import exampleReducer from "./example"
import authReducer from "./authSlice"
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"

export const store = configureStore({
    reducer: {
        user : userReducer,
        example : exampleReducer,
        auth : authReducer,
        product : productReducer,
        cart : cartReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch