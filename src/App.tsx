import { BrowserRouter, Route, Routes } from "react-router-dom"
import Example from "./pages/Example"
import Register from "./pages/authUser/Register"
import Login from "./pages/authUser/Login"
import Products from "./pages/product/Products"
import SingleProduct from "./pages/singleProduct/SingleProduct"
import Cart from "./pages/cart/Cart"
import Checkout from "./pages/checkout/Checkout"
import Layout from "./pages/layout/Layout"



function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/example" element={<Example/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
