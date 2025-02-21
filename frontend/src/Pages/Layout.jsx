
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Layout = () => {
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row">
      <Navbar />
      <div className="flex-1 overflow-y-scroll">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;
