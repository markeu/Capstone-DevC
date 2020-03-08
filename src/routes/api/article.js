import express from 'express';
import { multerUploads } from '../../config/MulterUpload';
import { validate, Authenticate } from '../../middlewares';
import { ArticleController } from '../../controllers';

const { verifyToken } = Authenticate;
const {
  createArticle
} = ArticleController;

const router = express.Router();

router.post('/', multerUploads, verifyToken, createArticle);

export default router;
