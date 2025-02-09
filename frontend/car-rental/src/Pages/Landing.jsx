import React from 'react';

const Landing = () => {
  return (
    <div className='h-[550px] relative'>      
      <div className="bg-[url('/asset2.jpg')] bg-cover bg-right h-full absolute inset-0 z-0" />      
      <div className='absolute inset-0 bg-black opacity-70 z-10' />
      {/* Content */}
      <div className='absolute z-20 top-0 left-0 h-full w-full p-4'>
        <div className='flex items-center justify-between'>
          <div className='text-white text-4xl font-black'>Rent<span className='text-custom-dark text-4xl font-black'>Wheels</span></div>
          <div className='flex gap-7 justify-evenly'>
            <div className='text-white text-xl font-light cursor-pointer'>About Us</div>
            <div className='text-white text-xl font-light cursor-pointer'>How It Works</div>
            <div className='text-white text-xl font-light cursor-pointer'>Contact</div>
          </div>
          {/* <button className='bg-custom-grey py-2 px-5 rounded-3xl text-white font-bold'>Log In/Sign Up</button> */}
          <button className="bg-custom-grey py-2 cursor-pointer px-5 rounded-3xl text-white font-bold transition-transform transform hover:scale-105 hover:shadow-lg">
                  Log In/Sign Up
          </button>


        </div>
        <div className='ml-3 relative mt-20 text-6xl text-white font-bold'>Find, Reserve <br /> & Hire Cars <br /> Easily</div>
        <div className='ml-3 text-white font-semibold text-2xl mt-4'> Choose from a wide range of cars, book in <br /> seconds and hit the road with ease</div>
      </div> 
    </div>
  );
};

export default Landing;
