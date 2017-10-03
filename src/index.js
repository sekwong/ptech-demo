// src/ index.js

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import initRoutes from "./routes";
import dotenv from 'dotenv';

dotenv.config();

/*
mongoose.Promise = global.Promise;
const dbURI = "mongodb://localhost/local";
mongoose.connect(dbURI, {
    useMongoClient: true
});
*/
const app = express();
app.use(cors());
app.listen(3000, () => {
	initRoutes(app);
  console.log("API listening on port 3000!");
});

