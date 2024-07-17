
import { Link, useNavigate } from 'react-router-dom'
import Foot from '../components/Foot'
import { useContext, useState } from 'react';
import axios from 'axios'
import {URL} from '../url'
import { UserContext } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {setUser}=useContext(UserContext)
  const navigate=useNavigate();
  useContext

  const handleLogin = async () => {
    try {
      const res=await axios.post(URL+"/api/auth/login", {email,password},{withCredentials: true});

      console.log("login Successfull");
      // console.log(res.data);
      setUser(res.data);
      setError(false);
      navigate("/");
    }
    catch (err) {
      setError(true);
      console.log(err);
    }
  }
  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-xl font-extrabold">
          <Link to='/'>Blog Market</Link>
        </h1>
        <h3><Link to='/register'>Register</Link></h3>
      </div>

      <div className="w-full flex justify-center items-center h-[80vh]"  >
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Login To Your Account</h1>
          <input onChange={(e) => (setEmail(e.target.value))} className="w-full px-4 py-2 border-2 border-black outline-0 " type="text" placeholder="Enter your Email"></input>
          <input onChange={(e) => (setPassword(e.target.value))} className="w-full px-4 py-2 border-2 border-black outline-0 " type="password" placeholder="Enter your password"></input>
          <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black">Log In</button>
          {error &&<h3 className="text-red-500 text-sm">Something Went Wrong </h3>}
          <div className="flex justify-center items-center space-x-3">
            <p> New Here?</p>
            <p className='text-gray-500 hover:text-black'><Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
      <Foot />
    </>

  )
}


export default Login