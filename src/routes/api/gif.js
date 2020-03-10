import express from 'express';
import { validate, Authenticate } from '../../middlewares';
import { GifController } from '../../controllers';

const { verifyToken } = Authenticate;
const {
  createGif
} = GifController;

const router = express.Router();

router.post('/', validate('createGif'), verifyToken, createGif);

export default router;
