import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserService from './user.service.js';

const userService = new UserService({
  UserModel: User,
  bcryptLib: bcrypt,
  jwtLib: jwt,
  jwtSecret: process.env.JWT_SECRET
});

export default userService;
