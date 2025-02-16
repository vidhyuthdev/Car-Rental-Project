import { CiHome } from "react-icons/ci";
import { FaCar } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { GrContactInfo } from "react-icons/gr";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate,useLocation } from "react-router-dom";

const Navbar = () => {
    const navigate=useNavigate();
    const location=useLocation();
  return (
    <div className="h-full bg-custom-dark md:w-[220px] flex flex-col px-4 pt-14 justify-between">
      <div className="flex flex-col gap-14">
        <div
         onClick={()=>{navigate('/home')}}
         className={`flex justify-between items-center cursor-pointer hover:bg-gray-600 p-3 rounded-xl ${location.pathname==='/home'?' bg-gray-600':''}`}>
            <div className="text-white text-xl">Home</div>
            <CiHome color="white" size={28}/>
        </div>
        <div 
        onClick={()=>{navigate('/book')}}
        className={`flex justify-between items-center cursor-pointer hover:bg-gray-600 p-3 rounded-xl ${location.pathname==='/book'?' bg-gray-600':''}`}>
            <div className="text-white text-xl">Book A Car</div>
            <FaCar color="white" size={24}/>
        </div>
        <div 
        onClick={()=>{navigate('/my-bookings')}}
        className={`flex justify-between items-center cursor-pointer hover:bg-gray-600 p-3 rounded-xl ${location.pathname==='/my-bookings'?' bg-gray-600':''}`}>
            <div className="text-white text-xl">My Bookings</div>
            <CiCalendar color="white" size={28}/>
        </div>
        <div 
        onClick={()=>{navigate('/profile')}}
        className={`flex justify-between items-center cursor-pointer hover:bg-gray-600 p-3 rounded-xl ${location.pathname==='/profile'?' bg-gray-600':''}`}>
            <div className="text-white text-xl">My Profile</div>
            <GrContactInfo color="white" size={28}/>
        </div>
      </div>
      <div className="flex justify-between items-center cursor-pointer hover:bg-gray-600 p-3 rounded-xl mb-5">
        <div className="text-white text-xl">Log Out</div>
        <IoExitOutline color="white" size={28}/>
    </div>
    </div>
  )
}

export default Navbar

