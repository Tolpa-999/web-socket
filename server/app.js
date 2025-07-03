import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import bodyParser from "body-parser";

import cookieParser from "cookie-parser";

import connectDB from "./config/connectDB.js";


// import aiChatRoutes from "./routes/aichat.js";
import {server, app} from './socket/index.js'
import errorHandler from "./middleware/errorHandler.js";

import {allowedOrigins} from './utils/urls.js'



connectDB();
const PORT = process.env.PORT || 3000;



app.use(express.json());




app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true)
      
      if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    } else {
      return callback(new Error("Not Allowed by CORS"))
    } 
  },

  credentials : true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'x-language'], // optionally x-language

}))



app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())


const fakeToken = "pla pla pla"

app.all("*", (req, res) => {
  res.status(404).json({ status: "error", message: req.t('server.not_available') })
})

app.use(errorHandler);


server.listen(PORT, () => {
  console.log("Server is running on port " + PORT );
});


export default app; // ES modules export