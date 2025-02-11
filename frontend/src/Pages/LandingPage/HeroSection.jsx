import { useNavigate } from "react-router-dom"

const HeroSection = () => {

  const navigate=useNavigate();

  const HandleNavigateClick=()=>
  {
    navigate('/auth')
  }
  return (
    <div className='h-[550px] relative'>      
    <div className="bg-[url('/asset2.jpg')] bg-cover bg-right h-full absolute inset-0 z-0" />      
    <div className='absolute inset-0 bg-black opacity-70 z-10' />
    {/* Content */}
    <div className='absolute z-20 top-0 left-0 h-full w-full sm:p-4 p-2'>
      <div className='flex items-center justify-between'>
        <div className='text-white  sm:text-4xl text-2xl font-black'>Rent<span className='text-custom-dark  sm:text-4xl text-2xl font-black'>Wheels</span></div>         
        <button onClick={()=>HandleNavigateClick()}
         className="bg-custom-grey sm:text-base text-xs  py-1 px-1.5 sm:py-2  cursor-pointer sm:px-5 rounded-3xl text-white font-bold transition-transform transform hover:scale-105 hover:shadow-lg">
                Log In/Sign Up
        </button>               
      </div>
      <div className='flex flex-col justify-evenly'>
        <div className='ml-3 relative mt-20 text-4xl sm:text-6xl   text-white font-bold'>Find, Reserve <br /> & Hire Cars <br /> Easily</div>
        <div className='ml-3 text-white font-light sm:text-2xl text-xl mt-4 max-w-7/10'> Choose from a wide range of cars, book in <br /> seconds and hit the road with ease</div>
        <button onClick={()=>HandleNavigateClick()}
        className='bg-custom-dark py-3 px-6 rounded-3xl w-fit mt-4 text-white font-bold transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer'>
            Get Started!
        </button>
      </div>
    </div> 
  </div>
  )
}

export default HeroSection
