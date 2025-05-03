import React, { useEffect } from 'react'
import UserTable from './UserTable'
import { useAppDispatch, useAppSelector } from '../../../store/hook'

import AdminLayout from '../AdminLayout'
import { fetchUsers } from '../../../store/adminUsersSlice'

const Users = () => {
  const dispatch = useAppDispatch()
  const {users} = useAppSelector((state)=>state.users)
  useEffect(()=>{
    dispatch(fetchUsers())
  },[])
  return (
    <AdminLayout>
      <UserTable users = {users} />
    </AdminLayout>
    
  )
}

export default Users
