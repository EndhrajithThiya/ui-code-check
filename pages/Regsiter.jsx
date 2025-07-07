import React, { useContext, useState } from 'react';
import { AppContent } from '../context/Usecontex.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


import axios from 'axios'
import { getuserdata } from '../../server/controllers/usercontroller.js';
const Register = () => {
  const navigate = useNavigate()
  const {backend,setIsloggedin,getUserData} = useContext(AppContent);
    const [state, setState] = useState("sign");
  const [name,setName] = useState('');
  const [email,setemail]=useState('');
  const [password,setpassword] = useState('');
   const handle = async (e) => {
   
try{
    e.preventDefault();
    axios.defaults.withCredentials=true;
    if(state==="sign")
    {
      const {data} = await axios.post(backend+'/api/auth/register',{name,email,password})
      console.log(data.success)
      if(data.success===true)
      {
        setIsloggedin(true);
        getUserData();
        console.log(data.success)
        toast.success(data.message)
        navigate("/")

      }
      
      else{
        toast.error(data.message)

      }
    }
    else{
      const {data} = await axios.post(backend+'/api/auth/login',{email,password})
      if(data.success)
      {
        console.log(data.success)
        setIsloggedin(true);
         getUserData();
        toast.success(data.message)
          navigate("/")

      }
      else{
        toast.error(data.message)
      }
    }
}
catch(error)
{
  toast.error(error.message)
}
    
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {state === "sign" ? "SIGN UP" : "LOGIN"}
        </h2>
        <form onSubmit={handle}>
          {state === "sign" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
              
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
                onChange={(e)=>{setName(e.target.value)}}
                value={name}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              onChange={(e)=>{setEmail(e.target.value)}}
                value={email}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              onChange={(e)=>{setPassword(e.target.value)}}
                value={password}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {state === "sign" ? "Sign Up" : "Log In"}
          </button>
        </form>
        <p className='text-blue-500 m-3  ' onClick={()=>{navigate("/rest")}}>forgot password?</p>
        <p className="text-center text-sm text-gray-500 mt-4">
          {state === "sign" ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setState("login")}
              >
                Log in
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => setState("sign")}
              >
                Sign up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Register;
