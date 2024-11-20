import express from 'express';
import {
  createAssignment,
  updateAssignment,
  deleteAssignment,
  fetchAssignments,
  fetchStudentStatuses,
  fetchAssignmentsById,
  fetchAssignmentByStudentId,
  fetchAssignmentByInstId,
} from '../controllers/assignment.js';
// import { fetchArticlesByInstId } from '../controllers/aritcles.js';

const router = express.Router();

router.post('/create', createAssignment);

router.put('/update/:id', updateAssignment);

router.delete('/delete/:id', deleteAssignment);

router.post('/fetch', fetchAssignments);

router.get('/:id', fetchAssignmentsById);

router.post('/statuses', fetchStudentStatuses);

router.post('/get-inst-assign', fetchAssignmentByInstId);

router.post('/get-student', fetchAssignmentByStudentId);


export default router;
