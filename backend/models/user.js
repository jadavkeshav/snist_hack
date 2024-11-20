import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        lowercase: true,
    },
    institute:{
        type: String,
        required: true,
        minlength: 3,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
        default: "User",
    },
    avatar: {
        type: String,
        default: "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg",
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role:{
        type: String,
        enum: ['student', 'inst'],
        default: 'student',
        lowercase: true
    },
    token: {
        type: String,
        default: "",
    },
    tokenExpiration: {
        type: Date,
        default: new Date(),
    },
    interest:[{
        type: String,
        required: [true, "Atlease one of intreset is required"],
        lowercase: true
    }],
    coins:{
        type: Number,
        default: 0
    },
    badge:[{
        type: String
    }]
}, {
    timestamps: true,
});

const User = mongoose.models["user"] || mongoose.model("user", userSchema);
export default User;