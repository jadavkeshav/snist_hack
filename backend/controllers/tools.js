import { generativeAI } from "./gen-ai.js";
import User from '../models/user.js';

async function run(query) {
  const model = generativeAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(query);
  const response = result.response;
  return response.text();
}

export const getPath = async (skills) => {
  try {
    const response = await run(
      `I have a list of technical skills, and I want to generate a personalized learning path for someone who wants to master these skills. The skills are: ${skills}.

      Generate a detailed learning path by grouping the skills into logical categories (e.g., frontend development, backend development, DevOps, databases, project management, etc.).
      For each skill, include the following format of response.

      response: {
        description: "A brief description of the skills, and what i can achieve by mastering it.",
        prerequisites: "Any prerequisites required to learn this skill.",
        learning_resources: "A list of learning resources (e.g., online courses, books, tutorials, etc.) to learn this skill." should be a string.
        projects: "A list of projects to work on to practice this skill.",
      }

      send the complete thing markdown please...
      `
    );
    return response;
  } catch (error) {
    console.log(error);
    return error
  }
};

export const getLearningPath = async (req, res) => {
    try {
        const { studentId } = req.params;

        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required", success: false });
        }

        // Fetch the student's interests
        const student = await User.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found", success: false });
        }

        const studentInterests = student.interest || [];
        const learningPath = await getPath(studentInterests);

        res.status(200).json({ success: true, data: learningPath });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", success: false });
    }
}