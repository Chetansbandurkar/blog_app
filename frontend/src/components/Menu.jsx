import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";
export const Menu = () => {
    const {user}=useContext(UserContext);
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout=async()=>{
      try{
       const res= await axios.get(URL+"/api/auth/logout");
       console.log(res);
       setUser(null);
       navigate("/login");
      }
      catch(err){
        console.log(err);
      }
    }
  return (
    <div className="bg-black z-10 w-[200px] flex flex-col items-start absolute top-12 right-6 md:right-32  rounded-md p-4 space-y-4">
       {!user && <h3 className="text-white text-md hover:text-gray-500 cursor-pointer"><Link to="/login"> Login</Link> </h3>} 
       {!user && < h3 className="text-white text-md hover:text-gray-500 cursor-pointer"><Link to="/register"> register</Link></h3> }
       {user && < h3 className="text-white text-md hover:text-gray-500 cursor-pointer"><Link to={"/profile/"+user.id}> Profile</Link></h3> }
       {user && < h3 className="text-white text-md hover:text-gray-500 cursor-pointer"><Link to="/write"> Write</Link></h3> }
       {user && < h3 className="text-white text-md hover:text-gray-500 cursor-pointer"><Link to={"/myblogs/"+user.id}> My Blogs</Link></h3> }
       {user && < h3 onClick={handleLogout} className="text-white text-md hover:text-gray-500 cursor-pointer">Log Out</h3> }

    </div>
  )
}
