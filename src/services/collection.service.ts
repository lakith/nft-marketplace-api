import CollectionModel, { Collection } from '../models/collection.model';
import { findUserById } from './user.service';
import UserModel, { User } from '../models/user.model';

/**
 * @param {*} collection - collection data from the rest endpoint
 * @returns - returns created collection data
 */
export const createACollection = async (collection) => {
  try {
    const newCollection: Collection = new CollectionModel({ ...collection });

    collection = await newCollection.save();
    const data = {
      collection,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCollections = async () => {
  try {
    const collections = await CollectionModel.find();
    const data = {
      collections,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCollectionsByUser = async (userId) => {
  try {
    const collections = await CollectionModel.find({ creator: userId });
    const data = {
      collections,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCollection = async (id) => {
  try {
    const result = await CollectionModel.findById(id);

    if (result) {
      const collection: Collection = result;

      const userResult = await findUserById(collection?.creator);

      if (await userResult) {
        const data = {
          result,
          userResult,
        };

        return data;
      }

      return null;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const removeCollection = async (collectionId) => {
  try {
    const collection = await CollectionModel.findByIdAndDelete({ _id: collectionId });
    const data = {
      collection,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};
