import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../store/hook"

type AdminRouteProps = {
  children: JSX.Element
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const {user} = useAppSelector((state)=>state.auth)

  if (user.role !== "admin") {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute