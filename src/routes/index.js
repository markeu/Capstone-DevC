import express from 'express';
import userRoute from './api/user';
import articleRouter from './api/article';

const router = express.Router();

router.use('/auth', userRoute);
router.use('/articles', articleRouter);

export default router;
