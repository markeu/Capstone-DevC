import express from 'express';
import { UserController } from '../../controllers';
import { Authenticate, validate } from '../../middlewares';

const { verifyToken, verifyRootUser, verifyAdmin } = Authenticate;
const { registerUser, getUsers, loginUser } = UserController;

const router = express.Router();

router.post('/create-user-root', validate('userRegister'), verifyRootUser, registerUser);

router.post('/create-user', validate('userRegister'), verifyToken, verifyAdmin, registerUser);

router.get('/users', verifyToken, verifyAdmin, getUsers);

router.post('/signin', validate('loginUser'), loginUser);

export default router;
