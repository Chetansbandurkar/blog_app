const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const  token =req.cookies.token;
    console.log("cookies is ",req.cookies);
    console.log("Request in verifying is",req.Cookies.token)
    if(!token){
        return res.status(401).json("you are not authenticated");

    }

    jwt.verify(token,process.env.SECRET,async(err,data)=>{
        if(err){
            return res.status(403).json("token is not valid!")
        }
        req.userId=data._id
        next()
    })
}

module.exports=verifyToken