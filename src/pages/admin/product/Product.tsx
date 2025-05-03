import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hook"
import AdminLayout from "../AdminLayout"
import ProductTable from "./components/ProductTavle"
import { fetchProducts } from "../../../store/adminProductSlice"

const AdminProduct = () =>{
    const dispatch = useAppDispatch()
    const {products} = useAppSelector((state)=>state.adminProducts)
     useEffect(()=>{
         dispatch(fetchProducts())
     },[])
     return(
 
         <AdminLayout>
             <ProductTable products={products} />
         </AdminLayout>
     )
 }
 
 export default AdminProduct