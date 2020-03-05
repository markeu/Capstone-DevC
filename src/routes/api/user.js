import express from 'express';
import { UserController } from '../../controllers';
import { Authenticate, validate } from '../../middlewares';

const { verifyToken, verifyRootUser } = Authenticate;
const { registerUser } = UserController;

const router = express.Router();

router.post('/create-user-root', validate('userRegister'), verifyRootUser, registerUser);

export default router;
