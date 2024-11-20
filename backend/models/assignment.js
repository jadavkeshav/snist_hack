import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  maxMarks: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  badge: {
    type: String,
    required: false,
    trim: true,
  },
  submissions: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
      },
      submissionStatus: {
        type: String,
        enum: ['Not Submitted', 'Submitted', 'Graded'],
        default: 'Not Submitted',
      },
      grade: {
        type: Number,
        default: null,
      },
      badgeEarned: {
        type: Boolean,
        default: false,
      },
      submissionDate: {
        type: Date,
        default: null,
      },
    },
  ],
  quiz: {
    questions: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctOption: { type: Number, required: true },
      },
    ],
    totalQuestions: {
      type: Number,
      default: function () {
        return this.quiz.questions.length;
      },
    },
  },
}, {
  timestamps: true,
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
