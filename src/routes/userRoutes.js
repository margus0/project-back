const express = require('express');
const { createNewUser, findUser } = require('../controllers/userController');
const { validateUser } = require('../middleware/validation');

const userRouter = express.Router();

userRouter.post('/register', validateUser, createNewUser);
userRouter.post('/login', validateUser, findUser);

module.exports = userRouter;
