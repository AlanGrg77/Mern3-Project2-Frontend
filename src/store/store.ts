import { configureStore} from "@reduxjs/toolkit";
import exampleReducer from "./example"
import authReducer from "./authSlice"
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"
import checkoutReducer from "./checkoutSlice"
import categoryReducer from "./adminCategorySlice."
import usersReducer from "./adminUsersSlice"
import adminProductsReducer from "./adminProductSlice"

export const store = configureStore({
    reducer: {
        example : exampleReducer,
        auth : authReducer,
        product : productReducer,
        cart : cartReducer,
        checkout : checkoutReducer,
        category : categoryReducer,
        users : usersReducer,
        adminProducts : adminProductsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch