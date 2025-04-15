import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useVerifyToken from '../../Hooks/useVerifyToken';
import toast from 'react-hot-toast';
import api from "../../api"

import LoadingSkeletons from "./LoadingSkeletons";

const BookCar = () => {
  const navigate = useNavigate();
  const { verifyToken } = useVerifyToken();
  const [filter,setFilter]=useState({location:null,startDate:null,endDate:null,type:null});
  const [cars,setCars]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const [page, setPage] = useState(1);
  const carsPerPage = 8;
  const startIndex = (page - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const currentCars = cars.slice(startIndex, endIndex);


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

  const sortHandler=(e)=>{
    console.log(e.target.value);
    
    let sortedCars=cars;
    if(e.target.value==0)
    {
      sortedCars = [...cars].sort((a, b) => a.price - b.price);
      setCars(sortedCars);
      return;
    }
    else if(e.target.value==1)
    {
      sortedCars = [...cars].sort((a, b) => b.price - a.price);
      setCars(sortedCars);
      return
    }   
  }

  const bookHandler=async(c_id)=>{
    const t=localStorage.getItem('token');

    try {
      const bookingDetails={
        token:t,
        carId:c_id,
        startDate:filter.startDate,
        endDate:filter.endDate
      }
    const response=await api.post('/booking/book',bookingDetails)
    toast.success('Booking Requested')
    } catch (error) {
      toast.error(error.response.data.msg)
      
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
          <select onChange={(e)=>{sortHandler(e)}} className="ml-2 border p-1 rounded-md text-sm">
            <option value={-1}>Select Sort Option</option>
            <option value={0}>Price (Low to High)</option>
            <option value={1}>Price (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Car Cards */}
      
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => <LoadingSkeletons key={i} />)
        : currentCars.map((car, i) => (
          <div className="border rounded-2xl shadow-md overflow-hidden text-sm">
          <img src={car.imageURL} alt="Car" className="w-full h-40 object-cover" />
          <div className="p-3">
            <h2 className="text-sm font-semibold mb-1">{car.model}</h2>
            <p className="text-xs text-gray-500">{car.type}</p>
            <p className="text-xs text-gray-500">{car.location}</p>
            <p className="mt-1 font-semibold">₹{car.price} / day</p>
            <button
             className="mt-2 w-full bg-custom-blue text-white py-1 rounded-lg text-sm cursor-pointer"
             onClick={()=>bookHandler(car.id)}
             >Book Now</button>
          </div>
        </div>
        ))
      }
    </div>



    <div className="mt-5 flex justify-center gap-2 items-center">
        <button
          className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200
            ${page === 1
              ? 'bg-custom-grey text-white cursor-not-allowed'
              : 'bg-custom-blue text-white hover:bg-custom-lightblue cursor-pointer'}
          `}
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Prev
        </button>
        <span className="mx-2 text-custom-dark font-medium bg-custom-lightblue px-3 py-1 rounded">
          Page {page} of {Math.ceil(cars.length / carsPerPage)}
        </span>
        <button
          className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200
            ${endIndex >= cars.length
              ? 'bg-custom-grey text-white cursor-not-allowed'
              : 'bg-custom-blue text-white hover:bg-custom-lightblue cursor-pointer'}
          `}
          disabled={endIndex >= cars.length}
          onClick={() => {
            setPage(page + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BookCar;
