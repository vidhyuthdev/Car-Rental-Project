




const CarCardComponent = ({ car }) => {
    return (
      <div className="border rounded-2xl shadow-md overflow-hidden text-sm">
        <img src={car.imageURL} alt="Car" className="w-full h-40 object-cover" />
        <div className="p-3">
          <h2 className="text-sm font-semibold mb-1">{car.model}</h2>
          <p className="text-xs text-gray-500">{car.type}</p>
          <p className="text-xs text-gray-500">{car.location}</p>
          <p className="mt-1 font-semibold">₹{car.price} / day</p>
          <button className="mt-2 w-full bg-custom-blue text-white py-1 rounded-lg text-sm cursor-pointer">Book Now</button>
        </div>
      </div>
    )
  }
  
  export default CarCardComponent