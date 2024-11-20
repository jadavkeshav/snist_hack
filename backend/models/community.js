import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    members: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            role: {
                type: String,
                enum: ['member', 'admin', 'moderator'],
                default: 'member'
            },
            joinedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Community = mongoose.model('Community', CommunitySchema);
export default Community;
