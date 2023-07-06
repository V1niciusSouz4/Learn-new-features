import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

import { getGithubUser, githubCallback } from './oAuth/index.js';
import { db } from '../../config/index.js';
import { hashToken, generateTokens } from '../../utils/index.js';

import {
  findUserByEmail,
  createUser,
  comparePassword,
  findUserById,
  findUserByGithubId,
} from '../users/users.service.js';

export const addRefreshTokenToWhiteList = ({ jwtId, refreshToken, userId }) => {
  try {
    return db.refreshToken.create({
      data: {
        id: jwtId,
        hashedToken: hashToken(refreshToken),
        userId,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const findRefreshTokenById = id => {
  try {
    return db.refreshToken.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteRefreshToken = id => {
  try {
    return db.refreshToken.update({
      where: {
        id,
      },
      data: {
        revoked: true,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const revokeTokens = userId => {
  return db.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
};

export const register = async ({ email, password, name, githubId }) => {
  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      throw new Error('Email already is use');
    }

    const user = await createUser({ email, password, name, githubId });

    const result = await returnResponse({ user });

    return result;
  } catch (error) {
    throw new Error();
  }
};

export const authenticatedUserByEmailAndPassword = async ({
  email,
  password,
}) => {
  try {
    const getUser = await comparePassword({ email, password });

    const result = await returnResponse({ user: getUser });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const refreshToken = async ({ refreshToken }) => {
  try {
    if (!refreshToken) throw new Error('Missing refresh token.');

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const getRefreshToken = await findRefreshTokenById(payload.jwtId);

    if (!getRefreshToken || getRefreshToken.revoked === true)
      throw new Error('Unauthorized');

    const hashedtoken = hashToken(refreshToken);

    if (hashedtoken !== getRefreshToken.hashedToken)
      throw new Error('Unauthorized');

    const user = await findUserById(payload.userId);

    if (!user) throw new Error('Unauthorized');

    await deleteRefreshToken(getRefreshToken.id);

    const result = await returnResponse({ user });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const oAuthGithub = async ({ requestToken }) => {
  try {
    const { access_token } = await githubCallback({ requestToken });

    const responseGithub = await getGithubUser({ access_token });

    const getUserDB = await findUserByGithubId(responseGithub.id.toString());

    if (!getUserDB)
      return {
        userId: responseGithub.id.toString(),
        message: 'User not found',
      };

    const result = await returnResponse({ user: getUserDB });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const returnResponse = async ({ user }) => {
  const jwtId = uuidv4();

  const { accessToken, refreshToken } = generateTokens(user, jwtId);

  await addRefreshTokenToWhiteList({
    jwtId,
    refreshToken,
    userId: user.id,
  });

  return {
    accessToken,
    refreshToken,
  };
};
