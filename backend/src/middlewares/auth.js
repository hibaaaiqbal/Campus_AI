import jwt from "jsonwebtoken"
import { Student } from "../models/student.js"

export const studentAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token not valid");
}
const decodedObj = jwt.verify(token,"campus-assistant",)
const {id,rollNo} = decodedObj
const student = await Student.findById(id);
if(!student){
          throw new Error("Student not found");
    }

    req.student = student  
    next()
  } catch (err) {
      res.status(401).json({
        success: false,
        message: "Invalid token: " + err.message,
      });
  }
};
