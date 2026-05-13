import express from "express";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser"
import cors from "cors"

import { Student } from "./models/student.js";
import { connectDB } from "./config/database.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

import { authRouter } from "./routes/auth.js";
import {timeTableRoute} from "./routes/timetable.js"

app.use("/api",authRouter)
app.use("/api",timeTableRoute)


app.get("/students", async (req, res) => {
  try {
    const students = await Student.find().select("-password"); // exclude password

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
});

connectDB()
  .then(() => {
    app.listen(7000);
    console.log("DB connection establisted successfully");
  })
  .catch(() => {
    console.error("DB connection Failed");
  });
