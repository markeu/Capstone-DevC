import express from 'express';
import userRoute from './api/user';
import articleRouter from './api/article';
import gifRouter from './api/gif';

const router = express.Router();

router.use('/auth', userRoute);
router.use('/articles', articleRouter);
router.use('/gif', gifRouter);

export default router;
