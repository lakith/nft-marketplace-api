import ArtModel, { Art } from '../models/art.model';

export const createArt = async (art) => {
  try {
    const newArt: Art = new ArtModel({ ...art });

    art = await newArt.save();
    const data = {
      art,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getArtByCollection = async (id) => {
  try {
    const arts = await ArtModel.find({ artCollection: id });
    const data = {
      arts,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const search = async (search) => {
  const { from, id, searchString, state, to } = search;

  try {
    let arts;

    if (state === 1) {
      arts = await ArtModel.find({ name: { $regex: `.*${searchString}.*` }, artCollection: id });
    } else if (state === 2) {
      arts = await ArtModel.find({ bid: { $gte: from, $lt: to }, artCollection: id });
    } else {
      arts = await ArtModel.find({ artCollection: id }).sort({ bid: 'asc' });
    }

    const data = {
      arts,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};
