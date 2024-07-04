const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cors=require('cors');
const multer=require('multer');
const path=require('path');
const authRoute=require('./routes/auth');
const userRoute=require('./routes/users');
const postRoute=require('./routes/posts');
const commentRoute=require('./routes/comments');
const cookieParser=require('cookie-parser');

// database!
const mongoose=require('mongoose')
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("databse connnected successfuly")
    }catch(err){
        console.log(err);
    }
}
// middlewears
dotenv.config();
// env will work after this
app.use(express.json());
app.use(cookieParser());
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"http://localhost:5173",credentials:true}));
// Specifying the origin in the cors middleware configuration is important for security reasons. By setting the origin to a specific URL, you restrict which origins (websites) are allowed to access your server. This helps prevent unwanted or malicious requests from unauthorized origins
app.use("/api/auth",authRoute);
app.use('/api/user',userRoute);
app.use("/api/posts",postRoute);
app.use("/api/comments",commentRoute);

// image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img);
        // fn(null,"image.jpg")
    }
})

const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    console.log(req.body)
    res.status(200).json("Image has Been Uploaded Successfuly!")
})


app.listen(process.env.PORT,()=>{
    connectDB();
    console.log("app is runnig on port 5000")
})


