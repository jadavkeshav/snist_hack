import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../../models/user.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config();

const login = ("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Please enter all fields", success: false });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User does not exist", success: false });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            institute: user.institute
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "3d" });

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        const response = {
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                name: user.name,
                coins: user.coins,
                institute: user.institute,
                role: user.role
            },
        };

        await User.findByIdAndUpdate(user._id, { token, tokenExpiration: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) });

        res.status(200).cookie("token", token, options).json({ message: "User logged in successfully", success: true, data: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", success: false });
    }
});

export default login;