import {
  findUserById,
  findAllUsers,
  createUser,
  deleteUser,
} from './users.service.js';

export const profile = async (req, res) => {
  try {
    const { userId } = req.payload;
    const user = await findUserById(userId);

    res.json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const findAll = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const user = req.body;

    await createUser(user);

    return res.status(200).json({ message: 'User created success!' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleted = async (req, res) => {
  try {
    const id = req.params.id;

    await deleteUser(id);

    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
