import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hook"
import { useEffect, useState } from "react"
import { setLogout } from "../../store/authSlice"
function Navbar(){
    const reduxToken = useAppSelector((store)=>store.auth.user.token)
    const localStorageToken = localStorage.getItem("userToken")
    const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        // setIsLoggedIn(!!localStorageToken || !!reduxToken)
        if(reduxToken && localStorageToken){
            setIsLoggedIn(true)
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
        </div></Link>HDokaan..
      </div>
      <div className="flex mt-4 sm:mt-0">
        <a className="px-4" href="#features">Features</a>
        <a className="px-4" href="#services">Services</a>
        <a className="px-4" href="#stats">Stats</a>
        <Link to={'/products'}>
          <div className="px-4">Products</div>
        </Link>
      </div>
      
      <div className="hidden md:block">
        {
            isLoggedIn ? (
                <Link to='/'>
                <button  type="button" onClick={handleLogout} className="mr-5 py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white ">Logout
                  </button>
                </Link>
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