import Cards from "./HowItWorksCards"
import cardData from "../../assets/Data/LandingPageCard";
const HowItWorks = () => {    
  return (
    <div className="bg-custom-dark pb-10 mt-14">
        <div className='pt-10 text-center text-custom-lightblue font-bold text-4xl'>
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
                        key={data.keyVal} 
                        />
                    </div>
                ))
            }
        </div>
    </div> )
}
export default HowItWorks;