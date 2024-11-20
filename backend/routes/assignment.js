import express from 'express';
import {
  createAssignment,
  updateAssignment,
  deleteAssignment,
  fetchAssignments,
  fetchAssignmentById,
  fetchStudentStatuses,
} from '../controllers/assignment.js';

const router = express.Router();

router.post('/create', createAssignment);

router.put('/update/:id', updateAssignment);

router.delete('/delete/:id', deleteAssignment);

router.post('/fetch', fetchAssignments);

router.get('/:id', fetchAssignmentById);

router.post('/statuses', fetchStudentStatuses);

export default router;
