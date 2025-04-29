import { FC } from "react";
import Sidebar from "./components/Sidebar"

type AdminLayoutProps = {
    children ?: React.ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({children}) => {
  return (
    <div>
        <div className="flex h-screen bg-gray-100">
  {/* sidebar */}
  <div className="hidden md:flex flex-col w-64 bg-gray-800">
    <div className="flex items-center justify-center h-16 bg-gray-900">
      <span className="text-white font-bold uppercase">Hamro Dokaan</span>
    </div>
    <Sidebar />
    
  </div>
  {/* Main content */}
  <div className="flex flex-col flex-1 overflow-y-auto">
    <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
      <div className="flex items-center pr-4">
      </div>
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
</div>

      
    </div>
  )
}

export default AdminLayout
