import { Schema,model } from "mongoose";

const studentSchema = new Schema(
  {
    rollNo: {
      type: String,
      required: [true, "Roll No is required"],
      unique: true,
      trim: true
    },
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(v);
        },
        message:
          "Password must contain uppercase, lowercase, number, and special character"
      }
    },

    semester: {
      type: Number,
      required: [true, "Semester is required"],
      min: [1, "Semester cannot be less than 1"],
      max: [8, "Semester cannot be greater than 8"]
    },

    branch: {
      type: String,
      required: [true, "Branch is required"],
      enum: {
        values: ["CSE", "IT", "ECE", "ME", "CE"],
        message: "Branch must be CSE, IT, ECE, ME or CE"
      }
    },

    programLeader: {
      type: String,
      trim: true
    },

    collegeEmail: {
      type: String,
      required: [true, "College email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },

    section: {
      type: String,
      required: [true, "Section is required"],
      enum: {
        values: ["A", "B", "C", "D", "E"],
        message: "Section must be A, B, C, D, or E"
      },
      set: (val) => val?.toUpperCase()
    }
  },
  {
    timestamps: true
  }
);

export const Student = model("Student", studentSchema);
