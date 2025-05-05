import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/authUser/Register"
import Login from "./pages/authUser/Login"
import Products from "./pages/product/Products"
import SingleProduct from "./pages/singleProduct/SingleProduct"
import Cart from "./pages/cart/Cart"
import Checkout from "./pages/checkout/Checkout"
import Layout from "./pages/layout/Layout"
import MyOrder from "./pages/my-orders/MyOrder"
import MyOrderDetail from "./pages/my-orders-details/MyOrderDetail"
import Categories from "./pages/admin/categories/Categories"
import AdminStats from "./pages/admin/stats/AdminStats"
import Users from "./pages/admin/users/Users"
import AdminProduct from "./pages/admin/product/Product"
import AdminOrder from "./pages/admin/orders/AdminOrder"
import AdminOrderDetails from "./pages/admin/order-details/AdminOrderDetails"
import { io } from 'socket.io-client'
import AdminRoute from "./globals/components/AdminRouteProcted"
export const socket = io("http://localhost:3000",{
  auth : {
    token  : localStorage.getItem("userToken")
  }
})




function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<SingleProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="my-orders" element={<MyOrder />} />
          <Route path="my-orders/:id" element={<MyOrderDetail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminRoute><AdminStats /></AdminRoute>} />
        <Route path="/admin/categories" element={<AdminRoute><Categories /></AdminRoute>} />
        <Route path="/admin/stats" element={<AdminRoute><AdminStats /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminProduct /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrder /></AdminRoute>} />
        <Route path="/admin/orders/:id" element={<AdminRoute><AdminOrderDetails /></AdminRoute>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
