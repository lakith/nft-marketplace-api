import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { createArt, getArtByCollection, search } from '../services/art.service';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createArt(req.body);
    const response = {
      message: 'Success',
      data,
    };

    res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};

export const getByCollection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getArtByCollection(req.param('id'));
    const response = {
      message: 'Success',
      data,
    };

    res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};

export const filter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await search(req.body);
    const response = {
      message: 'Success',
      data,
    };

    res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};
