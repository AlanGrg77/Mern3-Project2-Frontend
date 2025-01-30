
import { useAppDispatch, useAppSelector } from "../../store/hook";
import Navbar from "../../globals/components/Navbar";
import { deleteCart, updateCart } from "../../store/cartSlice";
import { IoTrashBinOutline } from "react-icons/io5";

const Cart = () => {
  const {cartItems} = useAppSelector((state)=>state.cart)
  const dispatch = useAppDispatch()
  const handleUpdate = (productId:string,quantity:number) =>{
    dispatch(updateCart({productId,quantity}))
  }
  const handleDelete = (productId:string)=>{
    dispatch(deleteCart(productId))
}
  const subTotal = cartItems.reduce((acc,cartItems)=>cartItems.product.productPrice * cartItems.quantity + acc,0)
  const cartTotalQuantity = cartItems.reduce((acc,cartItems)=>cartItems.quantity + acc,0)
  const shippingCost = 125
  const total = shippingCost + subTotal
  return (
    <>
    <Navbar />
      <div className="bg-gray-100 h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartItems.length > 0 && cartItems.map((c)=>{
                        return (
                          <tr>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            className="h-16 w-16 mr-4"
                            src={`http://localhost:3000/${c.product.productImageUrl}`}
                            alt="Product image"
                          />
                          <span className="font-semibold">{c.product.productName}</span>
                        </div>
                      </td>
                      <td className="py-4">Rs. {c.product.productPrice}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <button onClick={()=>handleUpdate(c.product.id,c.quantity - 1)} className="border rounded-md py-2 px-4 mr-2">
                            -
                          </button>
                          <span className="text-center w-8">{c.quantity}</span>
                          <button onClick={()=>handleUpdate(c.product.id,c.quantity + 1)} className="border rounded-md py-2 px-4 ml-2">
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">{c.product.productPrice && c.quantity  ? c.product.productPrice * c.quantity : 0 }</td>
                      <td className="py-4"><div onClick={()=>handleDelete(c.product.id)} className="cursor-pointer"><IoTrashBinOutline/></div></td>
                    </tr>
                        )
                      })
                    }
                    
                    {/* More product rows */}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>Rs. {subTotal}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Quantity</span>
                  <span>{cartTotalQuantity}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Rs. {shippingCost}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">Rs. {total}</span>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                  Checkout
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
