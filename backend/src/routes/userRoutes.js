import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', userController.getAllusers);
router.post('/', userController.createuser);
router.get('/:id', userController.getuserById);

export default router;
