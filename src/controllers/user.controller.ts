import { Request, Response, NextFunction } from 'express';
import { findDuplicateUsers, loginUser, signUpUser } from '../services/user.service';
import Constants from '../constants/constants';
import httpStatus from 'http-status';
import { BadRequest } from '../utils/errors';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userStatus = await findDuplicateUsers(req.body.email);

    if (!userStatus) {
      const user = req.body;
      const data = await signUpUser(user);
      const response = {
        message: Constants.userMessage.SIGNUP_SUCCESS,
        data,
      };

      res.status(httpStatus.CREATED).send(response);
    } else {
      throw new BadRequest('Email Already exists.');
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await loginUser(req.body);
    const response = {
      message: 'Success',
      data,
    };

    res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};
