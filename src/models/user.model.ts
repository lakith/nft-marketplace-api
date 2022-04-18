import mongoose, { Schema, model } from 'mongoose';
import { issueJWT } from 'src/utils/utils';
import validator from 'validator';
import { BadRequest } from '../utils/errors';

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

type Tokens = {
  token: string;
};
export type User = {
  name: string;
  email: string;
  password?: string;
  age: number;
  role: Role;
  tokens?: Tokens[];
} & mongoose.Document;

const UserSchema = new Schema<User>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new BadRequest('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new BadRequest('Password cannot contain "password"');
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new BadRequest('Age must be a postive number');
        }
      },
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: 'USER',
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  userObject.id = userObject._id;

  delete userObject._id;
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;

  return userObject;
};

UserSchema.virtual('collections', {
  ref: 'Collection',
  localField: '_id',
  foreignField: 'creator',
});

UserSchema.virtual('arts', {
  ref: 'Art',
  localField: '_id',
  foreignField: 'creator',
});

export default model<User>('User', UserSchema);
