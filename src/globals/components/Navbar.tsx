import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hook"
import { useEffect, useState } from "react"
import { setLogout } from "../../store/authSlice"
import { IoCartOutline } from "react-icons/io5";
import { fetchCart} from "../../store/cartSlice";
function Navbar(){
    const reduxToken = useAppSelector((store)=>store.auth.user.token)
    const localStorageToken = localStorage.getItem("userToken")
    const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false)
    const { cartItems } = useAppSelector((state)=>state.cart)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        // setIsLoggedIn(!!localStorageToken || !!reduxToken)
        if(reduxToken && localStorageToken){
            setIsLoggedIn(true)
            dispatch(fetchCart())
        }else{
          setIsLoggedIn(false)
        }
    },[reduxToken,localStorageToken])
    console.log(isLoggedIn)

    const handleLogout = () =>{
      dispatch(setLogout())
    }
 return ( 
    <header className="sticky top-0 bg-white shadow">
    <div className="container flex flex-col sm:flex-row justify-between items-center mx-auto py-4 px-8">
      <div className="flex items-center text-2xl">
        <Link to='/'>
        <div className="w-12 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#BEE3F8" d="M44,7L4,23l40,16l-7-16L44,7z M36,23H17l18-7l1,6V23z" />
            <path fill="#3182CE" d="M40.212,10.669l-5.044,11.529L34.817,23l0.351,0.802l5.044,11.529L9.385,23L40.212,10.669 M44,7L4,23 l40,16l-7-16L44,7L44,7z">
            </path>
            <path  fill="#3182CE" d="M36,22l-1-6l-18,7l17,7l-2-5l-8-2h12V22z M27.661,21l5.771-2.244L33.806,21H27.661z">
            </path>
          </svg>
        </div></Link>Hamro Dokaan..
      </div>
      <div className="flex mt-4 sm:mt-0">
        <Link to={'/products'}>
          <div className="px-4">Products</div>
        </Link>
        <Link className="px-4" to="/my-orders">My Orders</Link>

      </div>
      
      <div className="hidden md:block">
        {
            isLoggedIn ? (
              <div className="flex gap-12 relative ">
                  <Link to="/cart">
                  <div className="hover:scale-105 cursor-pointer">
                    <IoCartOutline size={46}/>
                    <span className="absolute -top-[10px] left-9 bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">{cartItems.length > 0 ? cartItems.length : 0}</span>
                  </div>
                  </Link>
                <Link to='/'>
                <button  type="button" onClick={handleLogout} className="mr-5 py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white ">Logout
                  </button>
                </Link>
              </div>
            )  : (
                <>
                <Link to='/register'>
                <button type="button" className="mr-5 py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white ">Register
                     </button>
                </Link>
                <Link to='/login'>
   <button type="button" className=" py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white ">Login
        </button>
   </Link>   
                </>
            )
        }
      </div>
    </div>
  </header>
 )
}


export default Navbar