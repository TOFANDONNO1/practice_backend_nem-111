const express=require('express');
const jwt=require('jsonwebtoken');

const postMiddleware =async(req,res,next) => {
const token=req.header('Authtoken');
if(!token){
    return res.status(401).send("Not token provided");
}
try {
    let decoded=jwt.verify(token,process.env.SECRET);
    req.userId=decoded.userId
    next()
} catch (error) {
    res.status(401).json({message:'Authorization denied', error: error})
}
};


module.exports={postMiddleware}