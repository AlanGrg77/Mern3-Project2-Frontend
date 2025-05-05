import { useEffect } from "react";

import AdminLayout from "../AdminLayout";
import AdminOrderTable from "./components/AdminOrderTable";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { fetchOrders } from "../../../store/adminOrderSlice";


function AdminOrder(){
    const dispatch = useAppDispatch()
    const {items} = useAppSelector((state)=>state.adminOrders)
     useEffect(()=>{
         dispatch(fetchOrders())
     },[])
    return (
        <AdminLayout>
            <AdminOrderTable orders={items}  />
        </AdminLayout>
    )
}

export default AdminOrder