import mongoose from "mongoose";
// Define the schema for messages
const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    required: true
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', MessageSchema);
export default Message
