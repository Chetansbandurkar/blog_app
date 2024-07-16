
import Navbar from '../components/Navbar'
import Foot from '../components/Foot'
import { ImCross } from 'react-icons/im'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState(null)
    const {user}=useContext(UserContext);
    console.log(user);
    const [cat, setCat] = useState("");
    const [cats, setCats] = useState([]);
    const navigate=useNavigate()
    const deleteCategory = (i) => {
        let updatedCats=[...cats];// shallo copy of cats
        updatedCats.splice(i,1);
        setCats(updatedCats);
    }
    const addCategory = () => {
        let updatedCats = [...cats]
        updatedCats.push(cat);
        setCat("")
        setCats(updatedCats)
    }
    const handleCreate=async(e)=>{
        e.preventDefault()
        const post={
            title,
            desc,
            username:user.username,
            userId:user.id,
            categories:cats

        }
        if(file){
            const data= new FormData();
            const filename=Date.now()+file.name
            data.append("img",filename)
            data.append("file",file)
            post.photo=filename
            try{
                // eslint-disable-next-line no-unused-vars
                const imgUpload= await axios.post(URL+"/api/upload",data)
                // console.log(imgUpload.data);
            }
            catch(err){
                console.log(err)
            }
        }
        // post upload
        try{
            const res=await axios.post(URL+"/api/posts/create",post)
            console.log(res)
            navigate("/posts/post/"+res.data._id);
        

        }
        catch(err){
            console.log(err);
        }
       
    }
    return (
        <div>
            <Navbar />
            <div className="px-6 md:px-[200px] mt-8 ">
                <h1 className="font-bold md:text-2xl text-xl mt-8">Create a Post</h1>
                <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
                    <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Enter the post title" className="px-4 py-2 outline-none" />
                    <input onChange={(e)=>setFile(e.target.files[0])} type="file" className="px-4 " />
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-4 md:space-x-8">
                            <input value={cat} onChange={(e) => setCat(e.target.value)} className="px-4 py-2 outline-none" placeholder='Enter the Post category ' type='text' />
                            <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer '>Add</div>
                        </div>
                        {/* categories */}
                        <div className="flex px-4 mt-3">
                            {cats?.map((c,i) => (
                                <div key={i}   className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                                    <p> {c} </p>
                                    <p onClick={deleteCategory} className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"><ImCross /></p>
                                </div>
                            ))};

                        </div>
                    </div>
                    <textarea onChange={(e)=>setDesc(e.target.value)} rows={15} cols={30} className='px-4 py-2 outline-none ' placeholder='Enter Post Description ' />
                    <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'> Create Post </button>
                </form>
            </div>
            <Foot />
        </div>
    )
}

export default CreatePost