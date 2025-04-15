import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useVerifyToken from '../../Hooks/useVerifyToken';
import toast from 'react-hot-toast';


const HomePage = () => {
    const navigate = useNavigate();
    const { verifyToken} = useVerifyToken();

    useEffect(() => {
      const checkToken = async () => {
          const {response,flag}=await verifyToken();        
          if(!flag)
          {           
           toast.error(response)
            navigate('/auth')     
          }    
      };
      checkToken();
  }, []);
  
   

    return (
        <>
        <div className="min-h-screen p-8 flex flex-col gap-6 bg-gray-100">
            
            {/* Welcome Section */}
            <div className="bg-gradient-to-r to-[#7e9bca] from-[#3A5A98] text-white p-6 rounded-2xl flex justify-between items-center shadow-lg">
                <div>
                    <h1 className="text-3xl font-bold">Welcome, User!</h1>
                    <p className="text-sm text-gray-200">Ready to hit the road? Find your perfect car now.</p>
                </div>
            </div>

            {/* Quick Booking Form */}
            <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-3">
                <h2 className="text-2xl font-semibold mb-4">Quick Booking</h2>
                <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-4 sm:grid-rows-1 gap-4">
                    <div className="flex flex-col">
                        <div>Enter Location</div>
                    <input type="text" placeholder="Pickup Location" className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"/>
                    </div>
                    <div className="flex flex-col">
                        <div>Enter Start Date</div>
                        <input type="date" placeholder="From Date" className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"/>
                    </div>
                    <div className="flex flex-col">
                        <div>Enter End Date</div>
                    <input type="date" className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"/>
                    </div>
                    <div className="flex justify-center items-center">
                    <button className="bg-custom-dark text-white text-center px-4 py-3 rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer">
                        Find a Car
                    </button>
                    </div>
                </div>
            </div>

            {/* Active Booking (If Exists) */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Active Booking</h2>
                <div className="flex justify-between items-center p-4 border rounded-lg bg-gray-50">
                    <p className="text-gray-700">No active bookings</p>
                    <button className="text-blue-600 font-semibold hover:underline">View Details</button>
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Recent Bookings</h2>
                <div className="flex flex-col gap-3">
                    <p className="text-gray-600">No recent bookings</p>
                </div>
            </div>
            
            
           
        </div>
        
        </>
    );
};

export default HomePage;


