
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Layout = () => {
  return (
    <div className="h-screen w-screen md:flex flex-col ">
      <Navbar />
      <div className="flex-1">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;
