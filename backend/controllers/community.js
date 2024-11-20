import Community from "../models/community.js";
import User from "../models/user.js";
import Message from "../models/message.js";

export const createCommunity = async (req, res) => {
    try {
        const { name, description, createdBy } = req.body;

        if (!name || !createdBy) {
            return res.status(400).json({ message: 'Name and createdBy are required', success: false });
        }

        const community = new Community({ name, description, createdBy });
        await community.save();

        res.status(201).json({ message: 'Community created successfully', success: true, data: community });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
};

// Join a community
export const joinCommunity = async (req, res) => {
    try {
        const { communityId, userId } = req.body;

        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ message: 'Community not found', success: false });
        }

        const isMember = community.members.some(member => member.userId.toString() === userId);
        if (isMember) {
            return res.status(400).json({ message: 'User already a member', success: false });
        }

        community.members.push({ userId });
        await community.save();

        res.status(200).json({ message: 'Joined community successfully', success: true, data: community });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
};

// Send a message in a community
export const sendMessage = async (req, res) => {
    try {
        const { content, sender, communityId } = req.body;

        if (!content || !sender || !communityId) {
            return res.status(400).json({ message: 'Content, sender, and communityId are required', success: false });
        }

        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ message: 'Community not found', success: false });
        }

        const message = new Message({ content, sender, community: communityId });
        await message.save();

        community.messages.push(message._id);
        await community.save();

        res.status(201).json({ message: 'Message sent successfully', success: true, data: message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
};

// Fetch all messages in a community
export const fetchCommunityMessages = async (req, res) => {
    try {
        const { communityId } = req.params;

        const community = await Community.findById(communityId).populate({
            path: 'messages',
            populate: { path: 'sender', select: 'username avatar' }
        });

        if (!community) {
            return res.status(404).json({ message: 'Community not found', success: false });
        }

        res.status(200).json({ message: 'Messages fetched successfully', success: true, data: community.messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', success: false });
    }
};