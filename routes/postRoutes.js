const express=require('express');
const jwt=require("jsonwebtoken");
const { postMiddleware } = require('../middleware/post.middleware');
const { PostModel } = require('../models/postModel');


const PostRouter=express.Router();


PostRouter.post("/create",postMiddleware, async(req,res)=>{
try {
    let {title, body,device,no_of_comments}=req.body;
    const obj={
        title,body,device,no_of_comments,author:req.userId
    }
    const post=await PostModel.create(obj);
    res.status(200).json({post});
} catch (error) {
    
    res.status(500).json({message: error.message});
}
})

PostRouter.get("/",postMiddleware, async(req,res)=>{
try {
    const {device,min_comments,max_comments}=req.query;
    let skip
    if(page){
        skip=(page-1)*3
    }else{
        skip=0
    }

    let query={author:req.userId};
    if(device){
        query.device=device;
    }
    if(min_comments){
        query.no_of_comments={$gte:min_comments}
    }
    if(max_comments){
        if(!query.no_of_comments){
            query.no_of_comments={$lte:max_comments}
        }else{
            query.no_of_comments.$lte=max_comments
        }
    }
    const postdata=await PostModel.findById(query).skip(skip).limit(3)
    res.status(200).json(postdata)
} catch (error) {
    res.status(500).json({message: error.message})
}
})

PostRouter.get("/top",postMiddleware,async(req,res)=>{
    try {
        const {page}=req.query;
        let skip
        if(page){
            skip=(page-1)*3;
        }else{
            skip=0
        }
const query={author:req.userId}
const postdata= await PostModel.find(query).sort({no_of_comments:-1}).skip(skip).limit(3)
res.status(200).json(postdata)
    } catch (error) {
res.status(500).json({message: error})        
    }
})

PostRouter.patch("/update/:id",postMiddleware,async(req,res)=>{
    try {
        const post=await PostModel.findById(req.params.id)
        if(!post) {
            res.send("Post not found")
        }
        if(post.author.toString()!==req.userId){
            res.send("Not authorized")
        }
        const updatedPost=await PostModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
res.status(200).send(updatedPost)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
PostRouter.delete("/delete/:id",postMiddleware,async(req,res)=>{
    try {
        const post=await PostModel.findById(req.params.id);
        if(!post){
            res.send("Post not found")
        }
        if(post.author.toString()!==req.userId){
            res.send("not authenticated")
        }
        const deletedPost=await PostModel.findByIdAndDelete(req.params.id)
        res.status(200).send("Post deleted")
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})



module.exports={PostRouter}