import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import toast from 'react-hot-toast';
const useAuth = (isSignUp, activeTab) => {
  const navigate = useNavigate();
 
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (formData) => {
    if (activeTab === "user") {
      
      setLoading(true);

      try {
        let response;
        if (!isSignUp) {
          response = await api.post("/auth/signin", formData);
        } else {
          response = await api.post("/auth/signup", formData);
        }

        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name",response.data.name);
          localStorage.setItem("email",response.data.email);
          navigate("/home");
        }
      } catch (err) {
        toast.error(err.response?.data?.msg || "Something went wrong")
        
      } finally {
        setLoading(false);
      }
    }
  };

  return { handleSubmitForm, loading };
};

export default useAuth;
