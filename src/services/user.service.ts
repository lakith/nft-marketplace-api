import UserModel, { User } from '../models/user.model';
const { BadRequest, GeneralError } = require('../utils/errors');
const { genPassword, issueJWT, validPassword } = require('../utils/utils');

export const findUserById = async (userId: string) => {
  try {
    const user = await UserModel.findById(userId);

    return user;
  } catch (error) {
    console.log('error', error);
    throw new GeneralError('Something Went Wrong..');
  }
};

export const findDuplicateUsers = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email }).lean();

    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new GeneralError(error);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const passwordIsValid = await validPassword(password, user);

      if (passwordIsValid) {
        const signedJWT = issueJWT(user);

        if (user.tokens) {
          user.tokens = user.tokens.concat({ token: signedJWT.token });
        } else {
          const tokens = [
            {
              token: signedJWT.token,
            },
          ];

          user.tokens = tokens;
        }
        await user.save();
        const data = {
          user,
          ...signedJWT,
        };

        return data;
      }
    } else {
      throw new BadRequest('Email Not Found');
    }
  } catch (error) {
    if (error instanceof BadRequest) {
      throw new BadRequest(error);
    } else {
      console.log('error', error);
      throw new GeneralError('Something Went Wrong..');
    }
  }
};

/**
 * @param {*} user - User data from the rest endpoint
 * @returns - returns registerd user data with tokens
 */
export const signUpUser = async (user) => {
  try {
    /****
     * This uses brcrpt to hash user passwords
     */
    const hashPassword = await genPassword(user.password);

    user.password = hashPassword;

    /****
     * This uses brcrpt to hash user passwords
     */
    const newUser: User = new UserModel({ ...user });

    user = await newUser.save();

    /**
     * Genarate a signed jwt and save it in jwt token list for new user
     */
    const signedJWT = issueJWT(user);

    if (newUser.tokens) {
      newUser.tokens = newUser.tokens.concat({ token: signedJWT.token });
    } else {
      const tokens = [
        {
          token: signedJWT.token,
        },
      ];

      newUser.tokens = tokens;
    }
    await newUser.save();

    const data = {
      user,
      ...signedJWT,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};
