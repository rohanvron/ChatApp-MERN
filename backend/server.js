import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectMongoDB from "./db/connectMongoDB.js";

import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/api/auth/signup", (req, res) => {
  res.json({
    message: "Signup endpoint is working",
    timestamp: new Date().toISOString()
  });
});


app.get("/test", (req, res) => {
  res.send("Test route is working");
});

app.use((req, res, next) => {
  res.status(404).send("Sorry, that route doesn't exist.");
});


app.use((err, req, res, next) => {
  console.error("Error details:");
  console.error(err);
  console.error("Request details:");
  console.error({
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  });
  res.status(500).json({ 
    error: "Internal Server Error", 
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '☢' : err.stack
  });
});


server.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server running on port ${PORT}`);
});
