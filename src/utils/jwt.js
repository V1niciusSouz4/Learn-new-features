import jwt from 'jsonwebtoken';

export const generateAcessToken = user => {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '30m',
  });
};

export const generateRefreshToken = (user, jwtId) => {
  return jwt.sign({ userId: user.id, jwtId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '4h',
  });
};

export const generateTokens = (user, jwtId) => {
  const accessToken = generateAcessToken(user);
  const refreshToken = generateRefreshToken(user, jwtId);

  return {
    accessToken,
    refreshToken,
  };
};
