import express from 'express';
import { UserController } from '../../controllers';
import { Authenticate } from '../../middlewares';

const { verifyToken, verifyRootUser } = Authenticate;
const { registerUser } = UserController;

const router = express.Router();

router.post('/create-user-root', verifyRootUser, registerUser);

export default router;
