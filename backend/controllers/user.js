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