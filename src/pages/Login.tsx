import { ChangeEvent,FormEvent,useEffect,useState } from "react"
import { Status } from "../globals/types/authType"
import { useAppDispatch, useAppSelector } from "../store/hook"
import {loginUser} from "../store/auth"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const {status, error} = useAppSelector((state) => state.auth)
    const [showError,setShowError] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    const [data,setData] = useState({
        email : "",
        password : "",
    })

    useEffect(()=>{
        if(status === Status.Error){
            console.log("Error in useEffect: ", error);
            setShowError(true)
            const timer = setTimeout(()=>{
                setShowError(false)
            },5000) 
        return () => clearTimeout(timer)
        }
        if(status === Status.Success){
          navigate("/")
          return
        }
    },[status])

    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target
        setData({
            ...data,
            [name] : value
        })

    }

    const handleSubmit = (e:FormEvent) =>{
        e.preventDefault()
        dispatch(loginUser(data))
    }

    
    if(status === Status.Loading){
    return <div className="flex justify-center items-center h-screen">
    <img src="/fade-stagger-circles.svg" alt="Centered Example" className="w-32 h-32" />
  </div>
    
    }

  return (
    <>
    
  <div className="max-w-lg mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
  <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Login</h1>
  <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
    <div className="flex items-start flex-col justify-start">
      <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
      <input type="email"  name="email" onChange={handleChange} className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
    </div>
    <div className="flex items-start flex-col justify-start">
      <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
      <input type="password"  name="password" onChange={handleChange} className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
    </div>
    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">Login</button>
  </form>
   {/* Show error message if there is any error */}
   {showError && error && <div className="text-red-500 mt-4">{error}</div>}
  <div className="mt-4 text-center">
    <span className="text-sm text-gray-500 dark:text-gray-300">Haven't Registered yet?</span>
    <Link to="/register">
      <div className="text-blue-500 hover:text-blue-600">Register</div>
    </Link>
   
   
  </div>
</div>


    </>
  )
}

export default Login