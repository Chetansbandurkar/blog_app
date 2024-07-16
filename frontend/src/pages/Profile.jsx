
import Navbar from '../components/Navbar'
import Foot from '../components/Foot'
import ProfilePosts from '../components/ProfilePosts'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { URL } from '../url'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
    const param=useParams().id
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [posts,setPosts]=useState([])
    const {user}=useContext(UserContext);
    const{setUser}=useContext(UserContext)
    // console.log(user);

    const navigate=useNavigate();

    const [updated,setUpdated]=useState(false);

    const fetchProfile = async() =>{
        try{
            const res=await axios.get(URL+"/api/user/"+user.id)
            // console.log(res.data);
            setUsername(res.data.username);
            setEmail(res.data.email);
            setPassword(res.data.password)
        }
        catch(err){
            console.log(err)
        }
    }

    const handleUserUpdate=async()=>{
        setUpdated(false)
        try{
            const res =await axios.put(URL +"/api/user/"+user.id,{username,email,password})
            console.log(res.data);
            setUpdated(true);
        }catch(err){
            console.log(err);
            setUpdated(false);
        }
    }


    const handleUserDelete=async()=>{
        try{
            const res =await axios.delete(URL +"/api/user/"+user.id)
            // console.log(res.data);
            setUser(null);
            navigate("/")
        }catch(err){
            console.log(err);
        
        }
    }

    const fetchUserPosts=async()=>{
        try{
            const res=await axios.get(URL+"/api/posts/user/"+user.id)
            // console.log(res.data);
            setPosts(res.data);
        }
        catch(err){
            console.log(err);
        }

    }
    useEffect(()=>{
        fetchUserPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[param])

    useEffect(()=>{
        fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[param])

    return (
        <div>
            <Navbar />
            <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
                <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
                    <h1 className="text-xl font-bold mb-4">Your Posts</h1>
                    {
                        posts?.map((p)=>(
                            <ProfilePosts key={p._id} p={p}/>
                        ))
                    }
                </div>
                <div className=" md:sticky  md:top-16 flex justify-start  md:justify-end items-start md:w-[30%] w-full md:items-end">
                    <div className='flex flex-col space-y-4 items-start'>
                        <h1 className="text-xl font-bold mb-4"> Profile </h1>
                        <input onChange={(e)=>setUsername(e.target.value)}  value={username} className="outline-none px-4 py-2 text-gray-500" placeholder="Your UserName" type="text" />
                        <input  onChange={(e)=>setEmail(e.target.value)}  value={email} className="outline-none px-4 py-2 text-gray-500" placeholder="Your Email" type="email" />
                        {/* <input  onChange={(e)=>setPassword(e.target.value)} value="" className="outline-none px-4 py-2 text-gray-500" placeholder="Your Password" type="password" /> */}
                        <div className="flex items-center space-x-4 mt-8">
                            {/* foe accoutn deletion */}
                            <button  onClick={handleUserUpdate} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Update</button>
                            <button  onClick={handleUserDelete} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Delete</button>

                        </div>
                    </div>

                </div>
                {updated && <h3 className="text-green text-sm text-center mt-4">User Updated Successfully</h3>}
            </div>
            <Foot />
        </div>
    )
}

export default Profile