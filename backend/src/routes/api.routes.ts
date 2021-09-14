import express from 'express';
import cors from 'cors';
import {
  registrationController,
  loginController,
  itemController,
} from '../controllers';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/registration', registrationController.post);
router.post('/login', loginController.post);
router.get('/item', itemController.get);
router.get('/item/:id', itemController.getById);
router.post('/item', itemController.post);
router.put('/item', itemController.put);

export default router;
