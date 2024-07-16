const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt=require('bcryptjs');
const Post=require('../models/Post');
const Comment=require('../models/Comment');
const verifyToken = require('../verifyToken');

// CREATE
router.post("/create",verifyToken,  async(req,res) => {
    try{
        const newPost=new Post(req.body);
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    }
    catch(err){
        console.log(err);   
    }
})

// UPDATE
router.put("/:id",verifyToken,async (req, res) => {
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        // with new:true
        // updated doc will be return 
        res.status(200).json(updatedPost);
    }catch(err){
        res.status(200).json(err);
    }
})


// DELETE
router.delete("/:id", verifyToken,async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post  Has Been Deleted!");
    }
    catch (err){
        res.status(500).json(err);
    }
})

// Get Post Details
// searc forthe post 
router.get("/:id",async(req,res)=>{
    try{
        const post =await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err);
    }
})
// get all posts
router.get("/",async(req,res)=>{
    const query=req.query
    try{
        const searchFilter={
            // $options:"i" make the search case insensetive 
            // means we can search in both lower case ans the upper case case

            title:{$regex:query.search,$options:"i"}
        }
        const posts=await Post.find(query.search?searchFilter:null);
        res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// get specific user's posts                
router.get("/user/:userId",async(req,res)=>{
    try{
        const posts=await Post.find({userId:req.params.userId});
        res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json(err);
    }
})


// // Search Posts
// router.get("/search/:prompt",async(req,res)=>{
//     try{

//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// })

module.exports = router

