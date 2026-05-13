import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


import { Student } from "../models/student.js";
import { Timetable } from "../models/timetable.js";
import { studentAuth } from "../middlewares/auth.js";

export const authRouter = express.Router()

// --------------------- SIGNUP USER ---------------------
authRouter.post("/student/signup", async (req, res) => {
  try {
    const {
      rollNo,
      password,
      firstName,
      lastName,
      semester,
      branch,
      programLeader,
      collegeEmail,
      section,
    } = req.body;

    if (!rollNo || !password || !collegeEmail || !section) {
  return res.status(400).json({
    success: false,
    message: "Required fields missing",
  });
}

    const hashPass = await bcrypt.hash(password, 10);

    const existingStudent = await Student.findOne({
      $or: [{ rollNo }, { collegeEmail }],
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }

    const student = await Student.create({
      rollNo,
      password: hashPass,
      firstName,
      lastName,
      semester,
      branch,
      programLeader,
      collegeEmail,
      section: section.toUpperCase(),
    });

    // JWT
    const token = jwt.sign(
      { id: student._id, rollNo: student.rollNo },
      "campus-assistant",
      { expiresIn: "7d" }
    );

    // token in cookie
    res.cookie("token", token, {
      httpOnly: true, 
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const studentObj = student.toObject();
    delete studentObj.password;

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: studentObj,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// --------------------- LOGIN USER ---------------------
authRouter.post("/student/login", async (req, res) => {
  try {
    const { rollNo, password } = req.body;

    if (!rollNo || !password) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const student = await Student.findOne({ rollNo });

    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // JWT
    const token = jwt.sign(
      { id: student._id, rollNo: student.rollNo },
      "campus-assistant",
      { expiresIn: "7d" }
    );

    // Cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // removing password
    const studentObj = student.toObject();
    delete studentObj.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: studentObj,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

authRouter.get("/student/me", studentAuth, (req, res) => {
  const { _id, rollNo, firstName, lastName, semester, branch, programLeader, collegeEmail, section } = req.student;

  res.status(200).json({
    success: true,
    data: {
      id: _id,
      rollNo,
      firstName,
      lastName,
      semester,
      branch,
      programLeader,
      collegeEmail,
      section,
    },
  });
});

authRouter.get('/student/test',(req,res)=>{
  res.send('test')
})
