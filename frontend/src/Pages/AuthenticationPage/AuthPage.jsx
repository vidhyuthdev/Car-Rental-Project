import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import ClipLoader from "react-spinners/ClipLoader";
import useVerifyToken from "../../Hooks/useVerifyToken";
import api from "../../api"
import toast from 'react-hot-toast'
const AuthPage = () => {
  const { verifyToken } = useVerifyToken();
  const [isSignUp, setIsSignUp] = useState(false);
  const [activeTab, setActiveTab] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const navigate = useNavigate();

  const { handleSubmitForm,loading } = useAuth(isSignUp, activeTab);

  const handleAdminSignIn = async ({ email, password }) => {
    setIsLoading(true);
    
    try {
      const response = await api.post("/admin/auth/signin", { email, password });
      
      
      
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/admin/approvals");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Admin Sign In Failed");
    }
    finally{
      setIsLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const checkToken = async () => {
      const { response, flag } = await verifyToken();

      if (flag) navigate("/home");
    };
    checkToken();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div
        onClick={handleNavigateHome}
        className="text-custom-dark bg-gray-100 sm:text-4xl text-2xl font-black cursor-pointer p-3"
      >
        Rent<span className="text-custom-dark sm:text-4xl text-2xl font-black">Wheels</span>
      </div>

      <div className="flex justify-center items-center flex-grow bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <div className="flex mb-4">
            <button
              className={`cursor-pointer w-1/2 py-2 text-lg font-semibold ${
                activeTab === "user" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("user")}
            >
              User
            </button>
            <button
              className={`cursor-pointer w-1/2 py-2 text-lg font-semibold ${
                activeTab === "admin" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
              onClick={() => {
                setActiveTab("admin");
                setIsSignUp(false);
              }}
            >
              Admin
            </button>
          </div>

          <h2 className="text-center text-2xl font-semibold mb-6 text-custom-dark">
            {activeTab === "admin" ? "Admin Sign In" : isSignUp ? "Sign Up" : "Log In"}
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (activeTab === "admin") {
                handleAdminSignIn({ email: formData.email, password: formData.password });
              } else {
                handleSubmitForm(formData);
              }
            }}
          >
            {isSignUp && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  placeholder="Enter your full name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                placeholder="Enter your Email address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {isSignUp && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  placeholder="Enter your 10-digit phone number"
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  
                  title="Phone number must be 10 digits"
                  required
                />
              </div>
            )}

            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  required
                />
                <span
                  className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>

              {activeTab === "user" && isSignUp && (
                <ul className="ml-4 mt-2 list-disc text-sm text-gray-600">
                  <li>Minimum 8 characters</li>
                  <li>Maximum 20 characters</li>
                  <li>At least one capital letter</li>
                  <li>At least one special character</li>
                  <li>At least one number</li>
                </ul>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#0E131F] text-white rounded-lg hover:opacity-90 transition cursor-pointer"
            >
              {(!loading&&!isLoading) && (activeTab === "admin" ? "Sign In" : isSignUp ? "Sign Up" : "Log In")}
              {(loading||isLoading) && <ClipLoader color="white" loading={loading||isLoading} size={20} />}
            </button>
          </form>

          {activeTab === "user" && (
            <p className="text-center text-sm text-gray-600 mt-4">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Log In" : "Sign Up"}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
