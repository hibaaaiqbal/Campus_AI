import express from "express"

import {Timetable} from "../models/timetable.js";
import {studentAuth} from "../middlewares/auth.js"

export const timeTableRoute = express.Router() 

// --------------------- ADD TIMETABLE ---------------------
timeTableRoute.post("/student/timetable/add", studentAuth, async (req, res) => {
  try {
    const student = req.student
    const { day, subject, teacher, time, room } = req.body;

    const timetable = await Timetable.create({
      studentId: student._id,
      day,
      subject,
      teacher,
      time,
      room,
    });

    res.status(201).json({
      success: true,
      message: "Timetable added successfully",
      data: timetable,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// --------------------- GET TIMETABLE ---------------------
timeTableRoute.get("/student/timetable",studentAuth, async (req, res) => {
  try {
  const student = req.student;

const data = await Timetable.find({
  branch: student.branch,
  semester: student.semester,
  section: student.section.toUpperCase()
});
console.log({
    branch: student.branch,
  semester: student.semester,
  section: student.section.toUpperCase()
})

    res.status(200).json({
      success: true,
      data,
      student
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// --------------------- UPDATE TIMETABLE ---------------------
timeTableRoute.put("/student/timetable/:id", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login required",
      });
    }

    const decoded = jwt.verify(token, "campus-assistant");

    const timetable = await Timetable.findOneAndUpdate(
      {
        _id: req.params.id,
        studentId: decoded.id,
      },
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: timetable,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// --------------------- DELETE TIMETABLE ---------------------
timeTableRoute.delete("/student/timetable/:id", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login required",
      });
    }

    const decoded = jwt.verify(token, "campus-assistant");

    await Timetable.findOneAndDelete({
      _id: req.params.id,
      studentId: decoded.id,
    });

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});