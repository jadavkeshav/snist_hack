import Assignment from "../models/assignment.js";
import User from "../models/user.js";

export const createAssignment = async (req, res) => {
    try {
        const { title, description, topic, maxMarks, createdBy, badge, quiz } = req.body;

        console.log(req.body);

        // Check for required fields
        if (!title || !description || !topic || !maxMarks || !createdBy) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Validate `quiz` structure, if provided
        if (quiz) {
            if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
                return res.status(400).json({
                    message: "Quiz must include a valid 'questions' array with at least one question.",
                    success: false,
                });
            }

            // Validate each question
            for (const question of quiz.questions) {
                if (
                    !question.questionText ||
                    !Array.isArray(question.options) ||
                    question.options.length === 0 ||
                    typeof question.correctOption !== "number"
                ) {
                    return res.status(400).json({
                        message: "Each question must have 'questionText', non-empty 'options', and a 'correctOption' (index).",
                        success: false,
                    });
                }
            }
        }

        // Prepare assignment object
        const assignmentData = {
            title,
            description,
            topic,
            maxMarks: parseInt(maxMarks, 10), // Ensure `maxMarks` is a number
            createdBy,
            badge,
            quiz: quiz || { questions: [] }, // Ensure `quiz` is always an object
        };

        // Create and save assignment
        const assignment = new Assignment(assignmentData);
        await assignment.save();

        res.status(201).json({
            message: "Assignment created successfully",
            success: true,
            data: assignment,
        });
    } catch (error) {
        console.error("Error creating assignment:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};


export const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find().populate('createdBy', 'username email');
        res.status(200).json({ success: true, data: assignments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const getAssignmentById = async (req, res) => {
    try {
        const { id } = req.params;

        const assignment = await Assignment.findById(id).populate('createdBy', 'username email');

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found", success: false });
        }

        res.status(200).json({ success: true, data: assignment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const updateAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedAssignment = await Assignment.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedAssignment) {
            return res.status(404).json({ message: "Assignment not found", success: false });
        }

        res.status(200).json({ message: "Assignment updated successfully", success: true, data: updatedAssignment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const deleteAssignment = async (req, res) => {
    try {
        const { id } = req.params;

        const assignment = await Assignment.findByIdAndDelete(id);

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found", success: false });
        }

        res.status(200).json({ message: "Assignment deleted successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const fetchAssignmentsById = async (req, res) => {
    try {
      const { assignmentId } = req.params;
  
      if (!assignmentId) {
        return res.status(400).json({ message: "Assignment ID is required", success: false });
      }
  
      // Fetch assignment by ID and populate fields
      const assignment = await Assignment.findById(assignmentId)
        .populate('createdBy', 'username email')
        .populate('submissions.studentId', 'username email');
  
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found", success: false });
      }
  
      res.status(200).json({ success: true, data: assignment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", success: false });
    }
  };

export const fetchAssignments = async (req, res) => {
    try {
      const { userId, role } = req.body;
  
      if (!userId || !role) {
        return res.status(400).json({ message: "User ID and role are required", success: false });
      }
  
      if (role === 'inst') {
        // Fetch assignments created by the instructor
        const assignments = await Assignment.find({ createdBy: userId }).populate('submissions.studentId', 'username email');
        return res.status(200).json({ success: true, data: assignments });
      }
  
      if (role === 'student') {
        // Fetch assignments where the student is listed in submissions
        const assignments = await Assignment.find({ 'submissions.studentId': userId });
        return res.status(200).json({ success: true, data: assignments });
      }
  
      res.status(400).json({ message: "Invalid role", success: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", success: false });
    }
  };

  export const fetchStudentStatuses = async (req, res) => {
    try {
      const { assignmentId, instructorId } = req.body;
  
      if (!assignmentId || !instructorId) {
        return res.status(400).json({ message: "Assignment ID and instructor ID are required", success: false });
      }
  
      // Verify that the assignment belongs to the instructor
      const assignment = await Assignment.findOne({ _id: assignmentId, createdBy: instructorId }).populate('submissions.studentId', 'username email');
  
      if (!assignment) {
        return res.status(404).json({ message: "Assignment not found or unauthorized", success: false });
      }
  
      const studentStatuses = assignment.submissions.map((submission) => ({
        studentId: submission.studentId._id,
        studentName: submission.studentId.username,
        email: submission.studentId.email,
        submissionStatus: submission.submissionStatus,
        grade: submission.grade,
        badgeEarned: submission.badgeEarned,
        submissionDate: submission.submissionDate,
      }));
  
      res.status(200).json({ success: true, data: studentStatuses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", success: false });
    }
  };
  
  export const fetchAssignmentByInstId = async (req, res) => {
    try {
      const { instId } = req.body;
  
      if (!instId) {
        return res.status(400).json({ message: "Instructor ID is required", success: false });
      }
  
      // Fetch assignments created by the instructor
      const assignments = await Assignment.find({ createdBy: instId });
  
      if (!assignments.length) {
        return res.status(404).json({ message: "No assignments found for this instructor", success: false });
      }
  
      res.status(200).json({ success: true, data: assignments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", success: false });
    }
  };

  export const fetchAssignmentByStudentId = async (req, res) => {
    try {
      const { studentId } = req.body;
  
      if (!studentId) {
        return res.status(400).json({ message: "Student ID is required", success: false });
      }
  
      // Fetch assignments with submissions marked as "Completed" for the student
      const assignments = await Assignment.find({
        'submissions.studentId': studentId,
        'submissions.submissionStatus': 'Completed'
      });
  
      if (!assignments.length) {
        return res.status(404).json({ message: "No completed assignments found for this student", success: false });
      }
  
      res.status(200).json({ success: true, data: assignments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", success: false });
    }
  };