const express = require("express");
const { UserModel } = require("../model/User.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Register
userRouter.post("/register", async (req, res) => {
  const { email, pass, name, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const user = new UserModel({ email, name, age, pass: hash });
      await user.save();
      res.status(200).send({ msg: "New user has been registered" });
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//Login
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    // console.log(user);
    if (user) {

        bcrypt.compare(pass, user.pass, (err, result) =>{
            console.log(user.pass)
           if(result){
            const token = jwt.sign({ authorID:user._id,author:user.name}, "monosage");
           
            res.status(200).send({ msg: "Login successful", token: token });
         
           }else{
      res.status(200).send({ msg: "Wrong  Credentials" });

           }
        });
      } else {
      res.status(200).send({ msg: "Wrong  Credentials" });
    }
    // res.send("Work")
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = { userRouter };
