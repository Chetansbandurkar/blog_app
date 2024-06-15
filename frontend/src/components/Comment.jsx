/* eslint-disable react/prop-types */

import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { URL } from '../url'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
// eslint-disable-next-line no-unused-vars
export const Comment = ({ c ,post}) => {
    const { user } = useContext(UserContext);
    const deleteComment = async (id) => {
        try {
            await axios.delete(URL + "/api/comments/"+id, { withCredentials: true })
           window.location.reload(true);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='px-2 py-2 bg-gray-200 rounded-lg my-2'>
            <div className='flex items-center justify-between'>
                <h3 className='font-bol text-gray-600'>@{c.author}</h3>
                <div className='flex justify-center items-center space-x-4'>
                    <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
                    <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
                    {user?.id === c?.userId? <div className='flex items-center justify-center space-x-2'>
                        <p onClick={()=>deleteComment(c._id)} className="cursor-pointer" ><MdDelete /></p>
                    </div>:""}
                </div>
            </div>
            <p className='px-4 mt-2'> {c.comment} </p>
        </div>
    )
}
