import Navbar from '../components/Navbar'
import Foot from '../components/Foot'
import { ImCross } from 'react-icons/im'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'

const EditPosts = () => {

  const postId = useParams().id

  // console.log(postId);
  const { user } = useContext(UserContext)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const navigate=useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId,{withCredentials: true})

      // console.log(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setFile(res.data.photo)
      setCats(res.data.categories)
    }
    catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  const handleUpdate =async (e) => {
    e.preventDefault()
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats

    }
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name
      data.append("img", filename)
      data.append("file", file)
      post.photo = filename
      try {
        // eslint-disable-next-line no-unused-vars
        const imgUpload = await axios.post(URL + "/api/upload", data,{withCredentials: true})
        // console.log(imgUpload.data);
      }
      catch (err) {
        console.log(err)
      }
    }
  
  // post upload
  try {
    const res = await axios.put(URL + "/api/posts/"+postId, post,{withCredentials: true})
    // console.log(res)/
    navigate("/posts/post/" + res.data._id);


  }
  catch (err) {
    console.log(err);
  }
}

  const deleteCategory = (i) => {
    let updatedCats = [...cats];// shallo copy of cats
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  }
  const addCategory = () => {
    let updatedCats = [...cats]
    updatedCats.push(cat);
    setCat("")
    setCats(updatedCats)
  }
  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8 ">
        <h1 className="font-bold md:text-2xl text-xl mt-8">Update a Post</h1>
        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
          <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter the post title" className="px-4 py-2 outline-none" />
          <input onChange={(e) => setFile(e.target.files[0])} type="file" className="px-4 " />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input value={cat} onChange={(e) => setCat(e.target.value)} className="px-4 py-2 outline-none" placeholder='Enter the Post category ' type='text' />
              <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer '>Add</div>
            </div>
            {/* categories */}
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                  <p> {c} </p>
                  <p onClick={deleteCategory} className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"><ImCross /></p>
                </div>
              ))};

            </div>
          </div>
          <textarea onChange={(e) => setDesc(e.target.value)} value={desc} rows={15} cols={30} className='px-4 py-2 outline-none ' placeholder='Enter Post Description ' />
          <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'> Update</button>
        </form>
      </div>
      <Foot />
    </div>
  )
}

export default EditPosts;
