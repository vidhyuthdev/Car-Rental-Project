import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useVerifyToken from '../../Hooks/useVerifyToken';
import toast from 'react-hot-toast';
const UserBookings = () => {
  const navigate = useNavigate();
    const { verifyToken} = useVerifyToken();

    useEffect(() => {
      const checkToken = async () => {
          const {response,flag}=await verifyToken();
          console.log(response);
                   
          if(!flag)
          {
            toast.error("Please Log In")
            navigate('/auth')         
          }
      };
      checkToken();
  }, []);
  return (
    <div>
    Building....
  </div>
  )
}

export default UserBookings
