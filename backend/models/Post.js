
const mongoose =require('mongoose');
const PostSchema=new mongoose.Schema({
    title:{
        type: 'string',
        required: true,
        unique: true
    },
    desc:{
        type: 'string',
        required: true,
        unique: true
    },
    photo:{
        type: 'string',
        required: false,
    },
    username:{
        type: 'string',
        required: true,
    },
    userId:{
        type: 'string',
        required: true,
    },
    categories:{
        type: Array,
    }

},{timestamps:true})     

module.exports=mongoose.model("Post",PostSchema);
