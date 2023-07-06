import { throwError } from '../utils/index.js';

export const handlePagination = (req, res, next) => {
  const { page, limit } = req.query;

  if (page && !Number.isInteger(+page)) {
    throwError('IvalidPage');
    return;
  }

  const currentPage = Number(page) || 1;
  const listPerPage = Number(limit || 5);
  const offset = (currentPage - 1) * listPerPage;

  req.pagination = { currentPage, listPerPage, offset };

  next();
};
