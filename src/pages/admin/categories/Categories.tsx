
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hook'
import AdminLayout from '../AdminLayout'
import CategoryTable from './componenets/CategoryTable'
import { fetchCategory } from '../../../store/adminCategorySlice.'

const Categories = () => {
  const dispatch = useAppDispatch()
    const {items:categories} = useAppSelector((state)=>state.category)
    useEffect(()=>{
        dispatch(fetchCategory())
    },[])
  return (

       <AdminLayout>
        <CategoryTable categories= {categories} />
       </AdminLayout>
  )
}

export default Categories
