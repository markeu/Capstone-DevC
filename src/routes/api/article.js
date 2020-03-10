import express from 'express';
import { validate, Authenticate } from '../../middlewares';
import { ArticleController } from '../../controllers';

const { verifyToken } = Authenticate;
const {
  createArticle, editArticle, deleteItem, getArticles, getArticle, commentArticle
} = ArticleController;

const router = express.Router();

router.get('/', verifyToken, getArticles);

router.get('/:id', verifyToken, getArticle)

router.post('/', validate('createArticle'), verifyToken, createArticle);

router.patch('/:id', validate('createArticle'), verifyToken, editArticle);

router.post('/:id/comment', verifyToken, commentArticle);

router.delete('/:id', verifyToken, deleteItem);

export default router;
