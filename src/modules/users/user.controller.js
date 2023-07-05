import {
  findUserById,
  findUserByEmail,
  findAllUsers,
  createUser,
  deleteUser,
} from './users.service.js';

export const profile = async (req, res) => {
  const { userId } = req.payload;
  const user = await findUserById(userId);

  res.json(user);
};

export const findAll = async (req, res) => {
  const { page, limit, query, order } = req.query;
  if (!Number.isInteger(+page)) throw new Error('Invalid Page');

  const currentPage = Number(page) || 1;
  const listPerPage = Number(limit) || 5;
  const offset = (currentPage - 1) * listPerPage;

  const result = await findAllUsers({ listPerPage, offset, query, order });

  res.json({
    data: result,
    meta: {
      page: currentPage,
    },
  });
};

export const create = async (req, res) => {
  const { nickname, email, password } = req.body;

  const userEmail = await findUserByEmail(email);
  if (userEmail)
    return res.status(400).json({ message: 'User already exists!' });

  await createUser({ nickname, email, password });

  return res.status(200).json({ message: 'User created success!' });
};

export const deleted = async (req, res) => {
  const id = req.params.id;

  await deleteUser(id);

  return res.status(200).json({ message: 'User deleted' });
};
