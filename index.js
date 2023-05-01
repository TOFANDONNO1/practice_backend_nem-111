const express=require('express');

const mongoose=require('mongoose');

const cors=require('cors');
const { UserRouter } = require('./routes/userRoutes');
const { PostRouter } = require('./routes/postRoutes');

const app = express();

require("dotenv").config()

app.use(express.json());

app.use(cors());


const connections = async()=>{
    try {
        await mongoose.connect(process.env.URL)
        console.log("connected to DB");
    } catch (error) {
        console.log(error);
    }
}

app.use("/user",UserRouter)
app.use("/post",PostRouter)

app.listen(process.env.PORT,()=>{
    connections()
    console.log(`Port: ${process.env.PORT}`);
})