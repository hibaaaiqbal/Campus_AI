import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
      required: [true, "Branch is required"],
      enum: {
        values: ["CSE", "IT", "ECE", "ME", "CE"],
        message: "Invalid branch"
      }
    },

    semester: {
      type: Number,
      required: [true, "Semester is required"],
      min: [1, "Min semester is 1"],
      max: [8, "Max semester is 8"]
    },

    section: {
      type: String,
      required: [true, "Section is required"],
      uppercase: true,
      trim: true,
      default: "A"
    },

    day: {
      type: String,
      required: true,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },

    lectureNumber: {
      type: Number,
      required: [true, "Lecture number is required"],
      min: [1, "Lecture number must be at least 1"]
    },

    timeSlot: {
      type: String,
      required: true
    },

    startTime: {
      type: String,
      required: [true, "Start time is required"]
    },

    endTime: {
      type: String,
      required: [true, "End time is required"]
    },

    subject: {
      type: String,
      required: true,
      trim: true
    },

    subjectCode: {
      type: String,
      trim: true
    },

    faculty: {
      type: String,
      required: true,
      trim: true
    },

    room: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      enum: ["Lecture", "Lab", "Break"],
      default: "Lecture"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Timetable = mongoose.model("Timetable", timetableSchema);
