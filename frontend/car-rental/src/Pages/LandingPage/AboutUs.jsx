const AboutUs = () => {
  return (
    <div className='flex flex-col items-center mt-4 mx-auto'>
      <div className='text-4xl text-custom-dark font-extrabold'>About Us</div>
      <div className='mx-5 grid grid-rows-3 sm:grid-cols-3 sm:grid-rows-1 mt-5'>
        <div className='flex flex-col items-center justify-center sm:border-r sm:border-r-gray-500 pr-3'>
            <div className='text-custom-dark text-4xl font-bold text-center'>50,000+</div>
            <div className='text-custom-dark text-xl text-center'>Thousands of happy customers drive with us every day."</div>

        </div>
        <div className='flex flex-col items-center mt-3 sm:mt-0 sm:border-r sm:border-r-gray-500 p-3'>
            <div className='text-custom-dark text-4xl font-bold text-center'>Available in 100+ cities</div>
            <div className='text-custom-dark text-xl text-center'>Find a car wherever you go, with seamless booking.</div>

        </div>
        <div className='flex flex-col items-center mt-3 sm:mt-0'>
            <div className='text-custom-dark text-4xl font-bold text-center'>4.8/5 Customer Rating</div>
            <div className='text-custom-dark text-xl text-center'>Top-rated service trusted by travelers worldwide</div>

        </div>

      </div>
    </div>
  )
}

export default AboutUs
