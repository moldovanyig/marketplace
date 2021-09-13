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
router.post('/item', itemController.post);
router.put('/item', itemController.put);

export default router;
