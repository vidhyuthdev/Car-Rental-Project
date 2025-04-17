
import { Outlet } from "react-router-dom";
import AdminNavbar from './Components/AdminNavbar'

const AdminLayout = () => {
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row">
      <AdminNavbar/>
      <div className="flex-1 overflow-y-scroll">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;