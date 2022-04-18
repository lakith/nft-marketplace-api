import mongoose, { Schema, model } from 'mongoose';

export type Art = {
  name: string;
  activeStatus: boolean;
  imageString: string;
  bid: number;
  collection: string;
} & mongoose.Document;

const ArtSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    activeStatus: {
      type: Schema.Types.Boolean,
      required: true,
    },
    imageString: {
      type: Schema.Types.String,
      required: true,
    },
    bid: {
      type: Schema.Types.Number,
      required: false,
    },
    artCollection: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Collection',
    },
  },
  {
    collection: 'Art',
    timestamps: true,
  },
);

export default model<Art>('Art', ArtSchema);
