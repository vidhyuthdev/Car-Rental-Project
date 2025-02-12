import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [activeTab, setActiveTab] = useState('user'); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const HandleNavigateClick = () => {
    navigate('/');
  };

  return (
    <div className='h-screen flex flex-col'>
      <div 
        onClick={HandleNavigateClick}
        className='text-custom-dark bg-gray-100 sm:text-4xl text-2xl font-black cursor-pointer p-3'
      >
        Rent<span className='text-custom-dark sm:text-4xl text-2xl font-black'>Wheels</span>
      </div>

      <div className="flex justify-center items-center flex-grow bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          
          <div className="flex mb-4 border-b">
            <button 
              className={`w-1/2 py-2 text-lg font-semibold ${activeTab === 'user' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('user')}
            >User</button>
            <button 
              className={`w-1/2 py-2 text-lg font-semibold ${activeTab === 'admin' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('admin')}
            >Admin</button>
          </div>

          <h2 className="text-center text-2xl font-semibold mb-6 text-custom-dark">
            {activeTab === 'admin' ? 'Admin Sign In' : isSignUp ? 'Sign Up' : 'Log In'}
          </h2>

          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input 
                placeholder='Enter your Email address'
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input 
                placeholder='Enter your password'
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              {activeTab === 'user' && isSignUp && (
                <ul className="mt-2 text-sm text-gray-600">
                  <li>✅ Minimum 8 characters</li>
                  <li>✅ Maximum 20 characters</li>
                  <li>✅ At least one capital letter</li>
                  <li>✅ At least one special character</li>
                  <li>✅ At least one number</li>
                </ul>
              )}
            </div>

            <button 
              type="submit" 
              className="w-full py-2 bg-[#0E131F] text-white rounded-lg hover:opacity-90 transition cursor-pointer"
            >
              {activeTab === 'admin' ? 'Sign In' : isSignUp ? 'Sign Up' : 'Log In'}
            </button>
          </form>

          {activeTab === 'user' && (
            <p className="text-center text-sm text-gray-600 mt-4">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <span 
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Log In' : 'Sign Up'}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
