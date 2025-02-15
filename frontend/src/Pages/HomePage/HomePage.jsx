import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useVerifyToken from '../../Hooks/useVerifyToken';

const HomePage = () => {
    const navigate = useNavigate();
    const { verifyToken} = useVerifyToken();

    useEffect(() => {
      const checkToken = async () => {
          const {response,flag}=await verifyToken();
          console.log(response);
                   
          if(!flag)
            navigate('/auth')         
      };
      checkToken();
  }, []);
  
   

    return (
        <div>
            Protected Home Page
        </div>
    );
};

export default HomePage;
