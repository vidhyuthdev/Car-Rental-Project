import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const useAuth = (isSignUp, activeTab) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (formData) => {
    if (activeTab === "user") {
      setError("");
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
          navigate("/home");
        }
      } catch (err) {
        setError(err.response?.data?.msg || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  return { handleSubmitForm, error, loading };
};

export default useAuth;
