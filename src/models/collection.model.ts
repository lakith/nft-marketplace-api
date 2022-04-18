import mongoose, { Schema, model } from 'mongoose';

export type Collection = {
  arts: [string];
  creator: string;
  name: string;
  about: string;
  activeStatus: boolean;
  imageString: string;
} & mongoose.Document;

const CollectionSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    about: {
      type: Schema.Types.String,
      required: true,
    },
    activeStatus: {
      type: Schema.Types.Boolean,
      required: true,
    },
    imageString: {
      type: Schema.Types.String,
      required: false,
    },
    arts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Art',
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    collection: 'Collection',
    timestamps: true,
  },
);

export default model<Collection>('Collection', CollectionSchema);
