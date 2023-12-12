import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import { appRoutes } from "../models/app-routes.js";

const app = express();

app.use(express.json());
app.use(appRoutes);

mongoose
	.connect(process.env.MONGO_CONNECTION_URL, { autoIndex: false })
	.then(() => console.log("Connected to mongoose"));

app.listen(process.env.PORT, () => {
	console.log(`Server started, port ${process.env.PORT}`);
});
