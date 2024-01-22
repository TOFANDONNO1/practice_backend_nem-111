const express= require('express');
const { connection } = require('./db');
const { userRouter } = require('./routes/User.routes');
const jwt = require('jsonwebtoken');
const { auth } = require('./middleware/auth.middleware');
const { noteRouter } = require('./routes/Note.routes');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users",userRouter);


app.get('/',(req,res)=>{
    res.send("Home Page");
});

app.get('/contact',(req,res)=>{
    res.send("Contact Page");
});

app.get('/about',(req,res)=>{
    res.send("About Page");
});

//Protected routes
app.use(auth)


app.use("/notes",noteRouter)





// app.get('/movies',(req,res)=>{
    // const {token}=req.query;
//     const token =req.headers.authorization.split(' ')[1];
//     jwt.verify(token, 'monosage', (err, decoded) =>{
// if(decoded){
    // res.status(200).send("Movie Page");

// }else{
//     res.status(404).send({"err":err.message})
// }
//       });
// });

// app.get('/series',(req,res)=>{
    // const {token}=req.query;
//     const token =req.headers.authorization.split(' ')[1];

//     jwt.verify(token, 'monosage', (err, decoded) =>{
// if(decoded){
    // res.status(200).send("Series Page");

// }else{
//     res.status(404).send({"err":err.message})
// }
//       });
  
// });









app.listen((8080),async()=>{
    try {
        await connection
        console.log("Server listening on port 8080");
    } catch (error) {
        console.log(error);
        console.log(" No Connection");

    }
 
})