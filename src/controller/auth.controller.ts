import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import sendResponse from '../utils/response.processor';
import UserModel from '../model/user.model';
import config from '../config/config';

export const register = async (req: Request, res: Response) => {
  try {
    const { userName, userEmail, userPassword } = req.body;

    let user = await UserModel.findOne({ userEmail });
    if (user) return sendResponse(req, res, 400, `User with email ${userEmail} already exists`, null);

    user = await UserModel.create({ userName, userEmail, userPassword });

    return sendResponse(req, res, 201, 'User registered successfully', { user });
  } catch (err) {
    console.log(err);
    return sendResponse(req, res, 500, 'User registration failed', null);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { userEmail, userPassword } = req.body;

    const user = await UserModel.findOne({ userEmail });
    if (!user || !user.comparePassword(userPassword)) return sendResponse(req, res, 401, 'Invalid email or password', null);

    const payload = { id: user._id, userEmail: user.userEmail };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });

    return sendResponse(req, res, 200, 'User login successful', { token });
  } catch (err) {
    console.log(err);
    return sendResponse(req, res, 500, 'User login failed', null);
  }
};
