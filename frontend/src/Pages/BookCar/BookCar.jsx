import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useVerifyToken from '../../Hooks/useVerifyToken';
import toast from 'react-hot-toast';
import api from "../../api"
import CarCardComponent from "./CarCardComponent";
import LoadingSkeletons from "./LoadingSkeletons";

const BookCar = () => {
  const navigate = useNavigate();
  const { verifyToken } = useVerifyToken();
  const [filter,setFilter]=useState({location:null,startDate:null,endDate:null,type:null});
  const [cars,setCars]=useState([]);
  const [isLoading,setIsLoading]=useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const { response, flag } = await verifyToken();     

      if (!flag) {       
        toast.error("Please Log In");
        navigate('/auth');
      }
    };
    checkToken();
  }, []);

  const handleFilter=async()=>{
    setIsLoading(true);
    const t=localStorage.getItem('token');  
     
    try {
      const response=await api.post('/booking/filter',{token:t,parameters:filter});  
      setCars(response.data.cars);  
      console.log(cars);
                 
    } catch (error) {      
      toast.error(error.response.data.msg);      
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4"> 
      {/* Filters */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="flex flex-col justify-center">
            <label htmlFor="location" className="block text-xs font-medium text-gray-700">Location</label>
          <select onChange={(e)=>{setFilter({...filter,location:e.target.value}); console.log(filter);}} id="location" className="p-2 border rounded-md col-span-1 w-full text-sm">
            <option value="NONE">Select City</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Pune">Pune</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Indore">Indore</option>
            <option value="Bhopal">Bhopal</option>
            <option value="Visakhapatnam">Visakhapatnam</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Coimbatore">Coimbatore</option>
          </select>
        </div>


        <div className="flex flex-col justify-center">
          <label htmlFor="start-date" className="block text-xs font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id="start-date"
            className="p-2 border rounded-md col-span-1 w-full text-sm"
              onChange={(e)=>{setFilter({...filter,startDate:e.target.value}); console.log(filter);}}
            min={new Date().toISOString().split('T')[0]}
            max={filter.endDate?filter.endDate:""}
            
          />
        </div>

        <div className="flex flex-col justify-center">
          <label htmlFor="end-date" className="block text-xs font-medium text-gray-700">End Date</label>
          <input
            type="date"
            id="end-date"
            className="p-2 border rounded-md col-span-1 w-full text-sm"
            onChange={(e)=>{setFilter({...filter,endDate:e.target.value}); console.log(filter);}}

            min={filter.startDate?filter.startDate:new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="flex flex-col justify-center">
          <label htmlFor="car-type" className="block text-xs font-medium text-gray-700">Type of Car</label>
          <select
            id="car-type"
            className="p-2 border rounded-md col-span-1 w-full text-sm"
            onChange={(e)=>{setFilter({...filter,type:e.target.value}); console.log(filter);}}
          >
            <option value="NONE">Select a Type</option>
            <option value={'*'}>All Types</option>
            <option value={"Petrol"}>Petrol</option>
            <option value={"Diesel"}>Diesel</option>
            <option value={"Electric"}>Electric</option>
          </select>
        </div>

        <div className="flex items-center" onClick={()=>handleFilter()}>
          <button className="bg-custom-dark mt-4 text-white p-2 rounded-md col-span-1 w-full text-sm">Search</button> 
        </div>
      </div>

      {/* Sort & View Toggle */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-600 text-xs">Sort by: {/* Smaller text */}
          <select className="ml-2 border p-1 rounded-md text-sm">
            <option value={"Price"}>Price (Low to High)</option>
            <option value={"Rating"}>Rating</option>
          </select>
        </div>
      </div>

      {/* Car Cards */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"> 
        {cars.map((_, i) => (
          <CarCardComponent key={i} car={_} />
         
        ))}
      </div> */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {isLoading
    ? Array.from({ length: 8 }).map((_, i) => <LoadingSkeletons key={i} />)
    : cars.map((car, i) => (
        <CarCardComponent key={i} car={car} />
      ))
  }
</div>

      <div className="mt-5 flex justify-end">Page 1 of x</div>
    </div>
  );
}

export default BookCar;
