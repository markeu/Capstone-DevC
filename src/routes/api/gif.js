import express from 'express';
import { validate, Authenticate } from '../../middlewares';
import { GifController } from '../../controllers';

const { verifyToken } = Authenticate;
const {
  createGif, getGif, deleteGif
} = GifController;

const router = express.Router();

router.post('/', validate('createGif'), verifyToken, createGif);

router.get('/:id', verifyToken, getGif);

router.delete('/:id', verifyToken, deleteGif);

export default router;
