import API from '../api/axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const {data} = await API.post("/user/login" , {username , password});
      localStorage.setItem("token" , data.token);
      console.log(data);
      alert("login Successfully..");
      navigate("/dashboard");
    }catch(err){
      alert(err.response?.data?.message || "Login Failed..");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      {/* Card container */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md mx-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Page</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              value={username}
              onChange = { (e) => { setUsername(e.target.value) } }
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              value={ password }
              onChange={ (e) => { setPassword(e.target.value) } }
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;