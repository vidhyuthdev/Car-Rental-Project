import { useState } from "react";
import { FaCar, FaClipboardCheck } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate, useLocation } from "react-router-dom";
import toast from 'react-hot-toast';

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>      
      {/* Top bar for small screens */}
      <div className="md:hidden flex p-2 bg-custom-dark">
        <GiHamburgerMenu 
          size={28} 
          color="white" 
          onClick={toggleMenu} 
          className="cursor-pointer"
        />
        <div className="flex-1 flex justify-center text-xl font-bold">
          <p className="text-white">Admin Panel</p>
        </div>        
      </div>

      {/* Sidebar */}
      <div className={`fixed md:relative top-0 left-0 min-h-full bg-custom-dark w-[220px] flex flex-col px-4 pt-14 justify-between z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col gap-14">
          {/* Approve Bookings */}
          <div 
            onClick={() => { navigate('/admin/approvals'); setIsOpen(false); }}
            className={`flex justify-between items-center cursor-pointer hover:bg-gray-600 p-3 rounded-xl ${location.pathname === '/admin/approvals' ? 'bg-gray-600' : ''}`}
          >
            <div className="text-white text-md">Mange Bookings</div>
            <FaClipboardCheck color="white" size={22} />
          </div>

          {/* Manage Cars */}
          <div 
            onClick={() => { navigate('/admin/manage-cars'); setIsOpen(false); }}
            className={`flex justify-between items-center cursor-pointer hover:bg-gray-600 p-3 rounded-xl ${location.pathname === '/admin/manage-cars' ? 'bg-gray-600' : ''}`}
          >
            <div className="text-white text-md">Manage Cars</div>
            <FaCar color="white" size={22} />
          </div>
        </div>

        {/* Logout */}
        <div 
          className="flex justify-between items-center cursor-pointer hover:bg-gray-600 p-3 rounded-xl mb-5"
          onClick={() => {
            setIsOpen(false);
            localStorage.removeItem('token');
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            navigate('/auth');
            toast.success("Logged Out!");
          }}
        >
          <div className="text-white text-md">Log Out</div>
          <IoExitOutline color="white" size={24} />
        </div>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default AdminNavbar;
