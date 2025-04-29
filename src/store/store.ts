import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import exampleReducer from "./example"
import authReducer from "./authSlice"
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"
import checkoutReducer from "./checkoutSlice"
import categoryReducer from "./adminCategorySlice."

export const store = configureStore({
    reducer: {
        user : userReducer,
        example : exampleReducer,
        auth : authReducer,
        product : productReducer,
        cart : cartReducer,
        checkout : checkoutReducer,
        category : categoryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch