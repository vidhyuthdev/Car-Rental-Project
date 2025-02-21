// import { CiHome } from "react-icons/ci";
// import { FaCar } from "react-icons/fa";
// import { CiCalendar } from "react-icons/ci";
// import { GrContactInfo } from "react-icons/gr";
// import { IoExitOutline } from "react-icons/io5";
// import { useNavigate,useLocation } from "react-router-dom";

// const Navbar = () => {
//     const navigate=useNavigate();
//     const location=useLocation();
//   return (
//     <div className="h-full bg-custom-dark md:w-[220px] flex flex-col md:px-4 md:pt-14 justify-between">
//       <div className="flex flex-col gap-14">
//         <div
//          onClick={()=>{navigate('/home')}}
//          className={`md:flex md:justify-between md:items-center md:cursor-pointer md:hover:bg-gray-600 md:p-3 md:rounded-xl hidden ${location.pathname==='/home'?' bg-gray-600':''}`}>
//             <div className="text-white  text-md">Home</div>
//             <CiHome color="white" size={24}/>
//         </div>
//         <div 
//         onClick={()=>{navigate('/book')}}
//         className={`md:flex md:justify-between md:items-center md:cursor-pointer md:hover:bg-gray-600 md:p-3 md:rounded-xl hidden ${location.pathname==='/book'?' bg-gray-600':''}`}>
//             <div className="text-white text-md">Book A Car</div>
//             <FaCar color="white" size={22}/>
//         </div>
//         <div 
//         onClick={()=>{navigate('/my-bookings')}}
//         className={`md:flex md:justify-between md:items-center md:cursor-pointer md:hover:bg-gray-600 md:p-3 md:rounded-xl hidden ${location.pathname==='/my-bookings'?' bg-gray-600':''}`}>
//             <div className="text-white text-md">My Bookings</div>
//             <CiCalendar color="white" size={24}/>
//         </div>
//         <div 
//         onClick={()=>{navigate('/profile')}}
//         className={`md:flex md:justify-between md:items-center md:cursor-pointer md:hover:bg-gray-600 md:p-3 md:rounded-xl hidden ${location.pathname==='/profile'?' bg-gray-600':''}`}>
//             <div className="text-white text-md">My Profile</div>
//             <GrContactInfo color="white" size={24}/>
//         </div>
//       </div>
//       <div className="md:flex md:justify-between md:items-center md:cursor-pointer hidden hover:bg-gray-600 p-3 rounded-xl mb-5">
//         <div className="text-white text-md">Log Out</div>
//         <IoExitOutline color="white" size={24}/>
//     </div>
//     </div>
//   )
// }

// export default Navbar
import { useState } from "react";
import { CiHome } from "react-icons/ci";
import { FaCar } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { GrContactInfo } from "react-icons/gr";
import { IoExitOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>      
      <div className="md:hidden flex p-2 bg-custom-dark">
        <GiHamburgerMenu 
          size={28} 
          color="white" 
          onClick={toggleMenu} 
          className="cursor-pointer"
        />
        <div className="flex-1 flex justify-center text-xl font-bold">
          <p className="text-white">RentWheels</p>
        </div>        
      </div>
      
      <div className={`fixed top-0 left-0 h-full bg-custom-dark w-[220px] flex flex-col px-4 pt-14 justify-between z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col gap-14">
          <div 
            onClick={() => { navigate('/home'); setIsOpen(false); }}
            className={`flex justify-between items-center cursor-pointer hover:bg-gray-600 p-3 rounded-xl ${location.pathname === '/home' ? 'bg-gray-600' : ''}`}
          >
            <div className="text-white text-md">Home</div>
            <CiHome color="white" size={24} />
          </div>

          <div 
            onClick={() => { navigate('/book'); setIsOpen(false); }}
            className={`flex justify-between items-center cursor-pointer hover:bg-gray-600 p-3 rounded-xl ${location.pathname === '/book' ? 'bg-gray-600' : ''}`}
          >
            <div className="text-white text-md">Book A Car</div>
            <FaCar color="white" size={22} />
          </div>

          <div 
            onClick={() => { navigate('/my-bookings'); setIsOpen(false); }}
            className={`flex justify-between items-center cursor-pointer hover:bg-gray-600 p-3 rounded-xl ${location.pathname === '/my-bookings' ? 'bg-gray-600' : ''}`}
          >
            <div className="text-white text-md">My Bookings</div>
            <CiCalendar color="white" size={24} />
          </div>

          <div 
            onClick={() => { navigate('/profile'); setIsOpen(false); }}
            className={`flex justify-between items-center cursor-pointer hover:bg-gray-600 p-3 rounded-xl ${location.pathname === '/profile' ? 'bg-gray-600' : ''}`}
          >
            <div className="text-white text-md">My Profile</div>
            <GrContactInfo color="white" size={24} />
          </div>
        </div>

        <div 
          className="flex justify-between items-center cursor-pointer hover:bg-gray-600 p-3 rounded-xl mb-5"
          onClick={() => setIsOpen(false)}
        >
          <div className="text-white text-md">Log Out</div>
          <IoExitOutline color="white" size={24} />
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default Navbar;
