import Navbar from '../../globals/components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Home from "../home/Home"

const Layout = () => {
    const location = useLocation()
  return (
    <div>
        <Navbar/>
        {
            location.pathname === "/" && <Home />
        }
        <Outlet/>

    </div>
  )
}

export default Layout