const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    title:{type:String,require:true},
    body:{type:String,require:true},
    device:{type:String,enum:['Laptop','Tablet','Mobile'],require:true},
    no_of_comments:{type:Number,require:true,default:0},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User',require:true}
})


const PostModel=mongoose.model('Post',postSchema)

module.exports={PostModel}