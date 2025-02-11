import Cards from "./Cards"

const HowItWorks = () => {

    const cardData=[
        {
            id:'01',
            heading:'Find a car',
            desc:'Browse through our fleet and choose the perfect car that fits your needs and budget.Filter by model, price, or features to make your selection effortless.'
        },
        {
            id:'02',
            heading:'Book rental',
            desc:'Select your rental dates and confirm availability with just a few clicks. Flexible booking options let you plan your trip hassle-free.'
        },
        {
            id:'03',
            heading:'Complete Payment',
            desc:'Secure your booking with an easy and transparent payment process. We accept multiple payment methods with no hidden charges.',
        },
        {
            id:'04',
            heading:'Booking Confirmed!',
            desc:'Get instant confirmation along with pickup details and car information. Simply arrive, collect your car, and hit the road with confidence!'

        },

    ]
  return (
    <div className="bg-custom-dark pb-10">
        <div className=' mt-6 text-center text-custom-lightblue font-bold text-4xl'>
            How it Works
        </div>
        <div className='mx-5 grid grid-rows-4 md:grid-cols-4 md:grid-rows-1 gap-14 mt-10'>                      
            {
                ...cardData.map((data) => (
                    <div className="flex justify-center">
                        <Cards 
                        id={data.id} 
                        heading={data.heading} 
                        desc={data.desc} 
                        key={data.id} 
                        />
                    </div>
                ))
            }

        </div>
    </div> )
}
export default HowItWorks;