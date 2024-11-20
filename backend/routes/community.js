import express from 'express';
import {
  createCommunity,
  joinCommunity,
  sendMessage,
  fetchCommunityMessages,
} from '../controllers/community.js';

const router = express.Router();

// Create a new community
router.post('/create', createCommunity);

// Join a community
router.post('/join', joinCommunity);

// Send a message in a community
router.post('/message', sendMessage);

// Fetch all messages in a community
router.get('/:communityId/messages', fetchCommunityMessages);

export default router;
