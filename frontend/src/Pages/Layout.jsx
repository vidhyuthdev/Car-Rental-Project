
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Layout = () => {
  return (
    <div className="h-screen w-screen flex">
      <Navbar />
      <div className="w-[calc(100vw-250px)]">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;
