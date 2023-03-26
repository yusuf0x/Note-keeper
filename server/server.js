const express = require("express");
const app = express();
const colors = require('colors');
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require("cors");
const NoteRoutes = require('./routes/NoteRoutes');
const UserRoutes = require('./routes/UserRoutes');
const  { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const   bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use('/storage', express.static('storage'));

app.use("/api/notes",NoteRoutes);
app.use("/api/users",UserRoutes);


app.use(notFound);
app.use(errorHandler);

/* MONGOOSE SETUP */
const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO);
    }catch(error){
        throw error;
    }
};

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected")
});
mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected")
});
app.listen(process.env.PORT,()=>{
    connect();
    console.log(`http://127.0.0.1:${process.env.PORT}`.cyan.underline);
});