import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const updatePassword = async (req, res) => {
    try {
        const { id, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);

        await User.findByIdAndUpdate(id, { password: hashedPassword });

        res.status(200).json({ message: "Password updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;

        await User.findByIdAndDelete(id);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateAvatar = async (req, res) => {
    try {
        const { id, avatar } = req.body;
        
        await User.findByIdAndUpdate(id, { avatar });

        res.status(200).json({ message: "Avatar updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateEmail = async (req, res) => {
    try {
        const { id, email } = req.body;

        await User.findByIdAndUpdate(id, { email });

        res.status(200).json({ message: "Email updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateName = async (req, res) => {
    try {
        const { id, name } = req.body;

        console.log(id, name);

        await User.findByIdAndUpdate(id, { name });

        res.status(200).json({ message: "Name updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const suggestInstructors = async (req, res) => {
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

    if (studentInterests.length === 0) {
      return res.status(400).json({ message: "Student has no interests listed", success: false });
    }

    // Fetch instructors
    const instructors = await User.find({ role: 'inst' });

    // Find instructors with matching interests and their specific matched interests
    const matchingInstructors = instructors
      .map((instructor) => {
        const instructorInterests = instructor.interest || [];
        const matchedInterests = studentInterests.filter((interest) =>
          instructorInterests.includes(interest)
        );

        if (matchedInterests.length > 0) {
          return {
            instructorId: instructor._id,
            name: instructor.name,
            email: instructor.email,
            matchedInterests, // Specific interests that matched
          };
        }

        return null;
      })
      .filter((instructor) => instructor !== null);

    if (matchingInstructors.length === 0) {
      return res.status(404).json({ message: "No matching instructors found", success: false });
    }

    res.status(200).json({
      success: true,
      data: matchingInstructors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    // Fetch students and sort by coins in descending order
    const students = await User.find({ role: 'student' }).sort({ coins: -1 });

    // If students are found, send them as a response
    if (students.length > 0) {
      return res.status(200).json({
        success: true,
        data: students,
      });
    } else {
      // If no students found
      return res.status(404).json({
        success: false,
        message: 'No students found.',
      });
    }
  } catch (error) {
    // If any error occurs, return an error response
    console.error("Error fetching students:", error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export const updateCoins = async (req, res) => {
  const { userId, coins } = req.body;

  // Check if the coins value is valid (e.g., a number)
  if (typeof coins !== 'number' || coins < 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid coins value. It must be a positive number.',
    });
  }

  try {
    // Find the user by ID and update the coins
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    // Update the user's coins
    user.coins = user.coins+coins;

    // Save the updated user
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Coins updated successfully.',
      data: user,
    });
  } catch (error) {
    console.error("Error updating coins:", error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};