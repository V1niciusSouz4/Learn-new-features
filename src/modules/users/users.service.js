import { hashSync, compare } from 'bcrypt';
import { db } from '../../config/index.js';

export const findUserByEmail = email => {
  try {
    return db.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    throw new Error('User not found');
  }
};

export const createUserByEmailOrGit = user => {
  try {
    user.password = hashSync(user.password, 12);
    return db.user.create;
  } catch (error) {
    throw new Error(error);
  }
};

export const createUser = async ({ nickname, email, password }) => {
  try {
    const userCreate = await db.user.create({
      data: {
        nickname,
        email,
        password,
      },
    });

    return userCreate;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUser = async id => {
  try {
    const userDeleted = await db.user.delete({
      where: {
        id,
      },
    });

    return userDeleted;
  } catch (error) {
    throw new Error(error);
  }
};

export const findUserById = id => {
  try {
    return db.user.findUnique({
      select: {
        id: true,
        email: true,
        role: true,
        nickname: true,
        password: false,
        verificationCode: false,
      },
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error('User not found');
  }
};

export const findAllUsers = async ({ offset, listPerPage, query, order }) => {
  try {
    return db.user.findMany({
      where: {
        email: {
          contains: query,
        },
      },
      orderBy: {
        createdAt: order ? order : 'desc',
      },
      select: {
        id: true,
        email: true,
        nickname: true,
      },
      skip: offset,
      take: listPerPage,
    });
  } catch (error) {
    throw new Error('Users not found');
  }
};

export const comparePassword = async ({ email, password }) => {
  try {
    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      throw new Error('User not found');
    }
    const validPassword = await compare(password, existingUser.password);

    if (!validPassword) {
      throw new Error('Invalid login credentials');
    }

    return existingUser;
  } catch (error) {
    throw new Error('User not found');
  }
};

export const findUserByGithubId = githubId => {
  try {
    return db.user.findUnique({
      select: {
        id: true,
        email: true,
        role: true,
        nickname: true,
        githubId: true,
      },
      where: {
        githubId,
      },
    });
  } catch (error) {
    throw new Error('User not found');
  }
};
