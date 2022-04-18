import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { createACollection, getAllCollections, getCollectionsByUser, removeCollection, getCollection } from '../services/collection.service';

export const createCollection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createACollection(req.body);
    const response = {
      message: 'Success',
      data,
    };

    res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getAllCollections();
    const response = {
      message: 'Success',
      data,
    };

    res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};

export const getByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getCollectionsByUser(req.param('id'));
    const response = {
      message: 'Success',
      data,
    };

    res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getCollection(req.param('id'));
    const response = {
      message: 'Success',
      data,
    };

    res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await removeCollection(req.param('id'));
    const response = {
      message: 'Success',
      data,
    };

    res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error);
  }
};
