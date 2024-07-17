/* eslint-disable react-hooks/exhaustive-deps */

import Navbar from '../components/Navbar'
import Foot from '../components/Foot'
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { Comment } from '../components/Comment'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { URL, IF } from '../url'
import { useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
const PostDetails = () => {
    const postId = useParams().id

    // console.log(postId);
    const [post, setPost] = useState({})
    const { user } = useContext(UserContext)
    // console.log(user);
    // console.log(post);
    const [comments, setComments] = useState([]);
    // console.log(comments[0]);
    const [comment, setComment] = useState("");
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();

    const fetchPost = async () => {
        setLoader(true);
        try {
            const res = await axios.get(URL + "/api/posts/" + postId,{withCredentials: true})
            // console.log(res.data)
            setPost(res.data);
            // console.log("hello");
            setLoader(false);
        }
        catch (err) {
            console.log(err)
            setLoader(true);
        }
    }

    const handleDeletePost = async () => {
        try {
            // eslint-disable-next-line no-unused-vars
            const res = await axios.delete(URL + "/api/posts/" + postId,{withCredentials: true})
            //  console.log(res.data);
            navigate("/");
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchPost()
    }, [postId])

    const fetchPostComments = async () => {
        try {
            const res = await axios.get(URL + "/api/comments/post/" + postId,{withCredentials: true})
            // console.log(res.data);
            setComments(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPostComments()
    }, [postId])

    const postComment = async (e) => {
        e.preventDefault();
        try {
            // id check
            const res = await axios.post(
                URL + "/api/comments/create",
                {
                    comment: comment,
                    author: user.username,
                    postId: postId,
                    userId: user.id
                },
                {
                    withCredentials: true,
                    credentials: 'include'
                }
            );
            console.log(res.data);
            // setComment("")
            // fetchPostComments()
           window.location.reload(true);

        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Navbar />
            {loader ? <div className="h-[80vh] flex justify-center items-center w-full"><Loader /></div> :
                <div className="px-8 md:px-[200px] mt-8">
                    <div className="flex justify-between items-center" >
                        <h1 className="text-2xl font-bold text-black md:text-3xl ">{post.title}</h1>
                        {user?.id === post?.userId && <div className="flex items-center justify-center space-x-2">
                            <p className='cursor-pointer' onClick={() => navigate("/edit/" + postId)}> <BiEdit /></p>
                            <p className='cursor-pointer' onClick={handleDeletePost}><MdDelete /></p>
                        </div>
                        }

                    </div>
                    <div className="flex items-center justify-between mt-2 md:mt-4">
                        <p>@{post.username}</p>
                        <div className=" flex space-x-2">
                            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
                        </div>
                    </div>

                    <img className="w-full mx-auto mt-8" src={IF + post.photo} alt="" />
                    <p className="mx-auto mt-8">{post.desc}</p>
                    <div className='flex items-center mt-8 space-x-4 font-semibold'>
                        <p>Categories:</p>
                        <div className='flex justify-center items-center space-x-2'>
                            {post.categories?.map((c, i) => (
                                <>
                                    <div key={i} className='bg-gray-300 rounded-lg px-3 py-1'>{c}</div>

                                </>
                                // <div key={i} className='bg-gray-300 rounded-lg px-3 py-1'>{c}</div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col mt-4'>
                        <h3 className='mt-6 mb-4 font-semibold'> Comments:</h3>
                        {/* Comments */}
                        {
                            comments?.map((c) => (
                                // console.log(c.data)
                                <Comment key={c._id} c={c} post={post}/>
                            ))
                        }
                        {/* Comments */}
                        {/* <Comment /> */}
                    </div>
                    {/* writte the comment  */}
                    <div className='flex flex-col mt-4 md:flex-row'>
                        <input onChange={(e) => setComment(e.target.value)} type='text' placeholder='Add a Comment' className='md:w-[80%] outline-none px-4 py-2 mt-4 md:mt-0' />
                        <button onClick={postComment} className='bg-black text-sm  text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0'> Add Comment</button>
                    </div>
                </div>
            }
            <Foot />
        </div>
    )
}

export default PostDetails;