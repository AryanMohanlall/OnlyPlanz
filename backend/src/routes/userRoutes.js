const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllusers);
router.post('/', userController.createuser);
router.get('/:id', userController.getuserById);

module.exports = router;
