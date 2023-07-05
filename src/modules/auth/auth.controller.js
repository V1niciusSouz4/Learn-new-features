import {
  register,
  authenticatedUserByEmailAndPassword,
  refreshToken as refreshTokenService,
  revokeTokens,
  oAuthGithub,
} from './auth.service.js';

export const create = async (req, res) => {
  const { email, password, nickname } = req.body;

  const result = await register({ email, password, nickname });

  return res.status(201).json(result);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authenticatedUserByEmailAndPassword({
    email,
    password,
  });

  return res.json(result);
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  const result = await refreshTokenService({ refreshToken });

  return res.json(result);
};

export const revokeRefreshTokens = async (req, res) => {
  const { userId } = req.body;

  await revokeTokens(userId);

  return res.json({ message: `Tokens revoked for user with id #${userId}` });
};

export const loginGithub = async (req, res) => {
  const { code: requestToken } = req.query;

  const result = await oAuthGithub({ requestToken });

  return res.json(result);
};

export const completeRegister = async (req, res) => {
  const { email, password, name, gitHubId } = req.body;

  const result = await register({ email, password, name, gitHubId });

  return res.status(201).json(result);
};
