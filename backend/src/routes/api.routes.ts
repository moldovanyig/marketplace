import express from 'express';
import cors from 'cors';
import {
  registrationController,
  loginController,
  itemController,
  userController,
} from '../controllers';
import authenticateToken from '../middlewares/authenticate-token';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/registration', registrationController.post);
router.post('/login', loginController.post);
router.get('/user', userController.get);
router.use(authenticateToken);
router.get('/item', itemController.get);
router.get('/item/:id', itemController.getById);
router.post('/item', itemController.post);
router.put('/item', itemController.put);

export default router;
