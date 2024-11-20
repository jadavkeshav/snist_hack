import dotenv from 'dotenv';
import User from '../../models/user.js';

dotenv.config();

const validate = ("/validate", async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Token is required", success: false });
        }

        const user = await User.findOne({
            token,
            tokenExpiration: { $gt: new Date() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid token", success: false });
        }

        res.status(200).json({ message: "Token is valid", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", success: false });
    }
});

export default validate;