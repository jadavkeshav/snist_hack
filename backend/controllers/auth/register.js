import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../../models/user.js';

dotenv.config();

const register = ("/register", async (req, res) => {
    try {
        const { username, email, password , interest, role, institute} = req.body;

        if (!username || !email || !password || !Array.isArray(interest) || interest.length === 0 || !role || !institute) {
            return res.status(400).json({ message: "Please enter all fields", success: false });
        }

        // Check for existing user
        const user = await User.findOne({ username, email });

        if (user) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            interest,
            role,
            institute
        });

        await newUser.save();

        const response = {
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        };

        res.status(200).json({ message: "User registered successfully", success: true, data: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", success: false });
    }
});

export default register;