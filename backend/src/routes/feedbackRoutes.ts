import { Router } from 'express';
import {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback
} from '../controllers/feedbackController';

const router = Router();

// POST /api/feedbacks - Create new feedback
router.post('/', createFeedback);

// GET /api/feedbacks - Get all feedbacks
router.get('/', getAllFeedbacks);

// GET /api/feedbacks/:id - Get single feedback
router.get('/:id', getFeedbackById);

// PUT /api/feedbacks/:id - Update feedback
router.put('/:id', updateFeedback);

// DELETE /api/feedbacks/:id - Delete feedback
router.delete('/:id', deleteFeedback);

export default router;
