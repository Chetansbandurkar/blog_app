const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTER 
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // encrypt the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password, salt);


        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }
    catch (err) {
        res.status(500).json(err)
    }
})
// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json("user not found");
        }
        // using compare instead of campareSynced = 
        // https://stackoverflow.com/questions/69324159/bcrypt-compare-or-bcrypt-comparesync
        const match=await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(401).json("wrong credentials");
        }
        // will expires in 3 days
        const token=jwt.sign({id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"3d"})
        //  here we are removing the password from the destructuring
        // as the password is present int the user.-doc nto int direact user is
        // if u conslve user it u will get it
        const {password,...info}=user._doc
        res.cookie("token",token).status(200).json(info);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// LOGOUT
router.get('/logout',async(req, res)=>{
    try{
        res.clearCookie("token",{sameSite:'none',secure:true}).status(200).send("user logged Out Successfullt")
    }catch(err){
        res.status(500).json(err);
    }
})

//REFETCH USER
router.get("/refetch", (req,res)=>{
    const token=req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})
module.exports = router
