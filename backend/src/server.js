import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";// make sure to write .js extension since we are importing a local file from our codebase
import messageRoutes from "./routes/message.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/auth",authRoutes);  // prefix them with /api/auth
app.use("/api/messages",messageRoutes);

app.listen(PORT,()=>console.log("Server running on port :" + PORT ));
