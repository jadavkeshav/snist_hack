import express from 'express';
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  fetchArticlesByInstId,
} from '../controllers/aritcles.js';

const router = express.Router();

router.post('/', createArticle);
router.get('/', getAllArticles); 
router.get('/:id', getArticleById);
router.put('/:id', updateArticle); 
router.delete('/:id', deleteArticle);
router.get('/get-inst', fetchArticlesByInstId);

export default router;
