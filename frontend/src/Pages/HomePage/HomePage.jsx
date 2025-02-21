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
        <div className='h-full w-full'>
            
        </div>
    );
};

export default HomePage;

// const HomePage = () => {
//     return (
//         <div className="h-full w-full p-8 flex flex-col gap-6 bg-gray-100">
            
//             {/* Welcome Section */}
//             <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-2xl flex justify-between items-center shadow-lg">
//                 <div>
//                     <h1 className="text-3xl font-bold">Welcome, User!</h1>
//                     <p className="text-sm text-gray-200">Ready to hit the road? Find your perfect car now.</p>
//                 </div>
//                 <button className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-200 transition">
//                     Book a Car
//                 </button>
//             </div>

//             {/* Quick Booking Form */}
//             <div className="bg-white p-6 rounded-2xl shadow-lg">
//                 <h2 className="text-2xl font-semibold mb-4">Quick Booking</h2>
//                 <div className="grid grid-cols-4 gap-4">
//                     <input type="text" placeholder="Pickup Location" className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"/>
//                     <input type="date" className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"/>
//                     <input type="date" className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"/>
//                     <button className="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
//                         Find a Car
//                     </button>
//                 </div>
//             </div>

//             {/* Active Booking (If Exists) */}
//             <div className="bg-white p-6 rounded-2xl shadow-lg">
//                 <h2 className="text-2xl font-semibold mb-4">Active Booking</h2>
//                 <div className="flex justify-between items-center p-4 border rounded-lg bg-gray-50">
//                     <p className="text-gray-700">No active bookings</p>
//                     <button className="text-blue-600 font-semibold hover:underline">View Details</button>
//                 </div>
//             </div>

//             {/* Recent Bookings */}
//             <div className="bg-white p-6 rounded-2xl shadow-lg">
//                 <h2 className="text-2xl font-semibold mb-4">Recent Bookings</h2>
//                 <div className="flex flex-col gap-3">
//                     <p className="text-gray-600">No recent bookings</p>
//                 </div>
//             </div>

//             {/* Support Section */}
//             <div className="bg-gray-200 p-4 text-center rounded-lg shadow-md">
//                 <p className="text-gray-700">Need help? <a href="#" className="text-blue-600 font-semibold hover:underline">Contact Support</a></p>
//             </div>

//         </div>
//     );
// };

// export default HomePage;
