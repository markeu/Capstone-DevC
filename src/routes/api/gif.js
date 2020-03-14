import express from 'express';
import { validate, Authenticate } from '../../middlewares';
import { GifController } from '../../controllers';

const { verifyToken } = Authenticate;
const {
  createGif, getGif, deleteGif, commentGif
} = GifController;

const router = express.Router();

router.post('/', validate('createGif'), verifyToken, createGif);

router.get('/:id', verifyToken, getGif);

router.delete('/:id', verifyToken, deleteGif);

router.post('/:id/comment', validate('comment'), verifyToken, commentGif);

export default router;
