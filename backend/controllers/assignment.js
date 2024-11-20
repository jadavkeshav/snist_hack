import Assignment from "../models/assignment";
import User from "../models/user";

export const createAssignment = async (req, res) => {
    try {
        const { title, description, topic, maxMarks, createdBy, badge, quiz } = req.body;

        if (!title || !description || !topic || !maxMarks || !createdBy) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const assignment = new Assignment({
            title,
            description,
            topic,
            maxMarks,
            createdBy,
            badge,
            quiz,
        });

        await assignment.save();
        res.status(201).json({ message: "Assignment created successfully", success: true, data: assignment });
    } catch (error) {
        console.error(error);
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

