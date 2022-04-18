import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { User } from 'src/models/user.model';

const pathToKey = path.join(__dirname, '../lib', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 * @param {*} inputPassword - The plain text password
 * @param {*} userPassword - The password stored in the database
 */
export async function validPassword(inputPassword: string, user: User) {
  const hashVerify = await bcrypt.compare(inputPassword, user.password);

  return hashVerify;
}

/**
 * @param {*} password - The password string that the user inputs to the password field in the register form
 */
export async function genPassword(password: string) {
  password = await bcrypt.hash(password, 12);
  return password;
}

export type IssueToken = {
  token: string;
  expires: string;
};

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
export function issueJWT(user: User): IssueToken {
  const { _id } = user;
  const expiresIn = '1d';
  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn, algorithm: 'RS256' });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
}
