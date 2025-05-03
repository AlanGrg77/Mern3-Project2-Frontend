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
        <Route path='/admin' element={<AdminStats/>} />
        <Route path='/admin/categories' element={<Categories />} />
        <Route path='/admin/stats' element={<AdminStats />} />
        <Route path='/admin/users' element={<Users />} />
        <Route path='/admin/products' element={<AdminProduct />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
