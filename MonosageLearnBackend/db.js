const mongoose = require('mongoose');

const connection=mongoose.connect("mongodb+srv://soumyaranjan:soumyaranjan@cluster0.qqic9x5.mongodb.net/authentication?retryWrites=true&w=majority")


module.exports = {connection}