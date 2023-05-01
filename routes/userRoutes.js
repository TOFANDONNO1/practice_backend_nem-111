const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const { UserModel } = require('../models/userModel');
const UserRouter=express.Router();


UserRouter.post("/register", async(req,res)=>{
    try {
        const {name,email,gender,password,age,city,is_married}=req.body;
        const user=new UserModel.findOne({email});
        if(user){
            return res.json({message:`User alrady exist,please login`});
        }
        const hashedPassword=await bcrypt.hash(password,10);
    
    const newuser=await UserModel.create({name,email,gender,password:hashedPassword,age,city,is_married})
res.status(201).json(newuser)    
} 
    catch (error) {
        res.status(500).json({message:error.message})
    }
})


UserRouter.post("/login",async (req,res)=>{

try {
    const {email,password}=req.body;
    const userPresent = await UserModel.find({email})
    if(!userPresent){
        res.json("User is not present")

    }
    const check = await bcrypt.compare(password,userPresent[0].password)
    if(!check){
        res.json("Invalid password")
    }
    const token=jwt.sign({userId:userPresent[0]._id},process.env.SECRET)
    res.json({email,token})
} catch (error) {
    res.status(500).json({message:error.message})
    
}
});



module.exports={UserRouter}