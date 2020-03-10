import express from 'express';
import userRoute from './api/user';
import articleRouter from './api/article';
import gifRouter from './api/gif';
import feedRouter from './api/feed';

const router = express.Router();

router.use('/auth', userRoute);
router.use('/articles', articleRouter);
router.use('/gif', gifRouter);
router.use('/feed', feedRouter);

export default router;
