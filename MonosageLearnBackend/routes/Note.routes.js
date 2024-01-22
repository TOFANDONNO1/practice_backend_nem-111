const express = require('express');
const { NoteModel } = require('../model/Note.model');
const noteRouter=express.Router();

noteRouter.post("/create",async(req,res)=>{

    try {
        const note=new NoteModel(req.body)
        await note.save();
res.status(200).send({"msg":"note created successfully"})
    } catch (error) {
     res.status(400).send({"msg":error.message});   
    }

});

noteRouter.get("/",async(req,res)=>{

    try {
        const notes=await NoteModel.find({authorID:req.body.authorID});
        res.send(notes);
    } catch (error) {
        res.send(error.message);
    }
});

noteRouter.patch("/update/:noteID",async(req,res)=>{

    const {noteID}=req.params;
    const note=await NoteModel.findOne({_id:noteID})
    try {
        if(req.body.authorID!==note.authorID){
res.status(200).send({"msg":`You are not authorized to do this actions. Pleas`});
        }else{

        await NoteModel.findByIdAndUpdate({_id:noteID},req.body);
        res.send({"msg":"Note updated successfully"})
    }
    // 65abba5331439df0ad4b79d6
    } catch (error) {
        res.send({"msg":"Error updating"});
    }
});

noteRouter.delete("/delete/:noteID",async(req,res)=>{
const {noteID}=req.params;
const note=await NoteModel.findOne({_id:noteID})
try {
    if(req.body.authorID!==note.authorID){
res.status(200).send({"msg":`You are not authorized to do this actions. Pleas`});
    }else{
    await NoteModel.findByIdAndDelete({_id:noteID});
    res.send({"msg":"Note deleted successfully"});
    }
} catch (error) {
    res.send({"msg":"Error deleting"});
}


});


module.exports={
    noteRouter
}