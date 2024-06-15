const mongoose =require('mongoose');
const CommentSchema=new mongoose.Schema({
    comment:{
        type: 'string',
        required: true,
    },
    author:{
        type: 'string',
        required: true,
        sparse:true,
    },
    postId:{
        type: 'string',
        required: true,
    },
    userId:{
        type: 'string',
        required: true,
    }
},{timestamps:true})     

module.exports=mongoose.model("Comment",CommentSchema);