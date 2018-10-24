import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import Config from '../../../config';

export const createTokens = async (user, secret, refreshSecret) => {
  const token = jwt.sign(
    {
      id: user.id
    },
    secret,
    {
      expiresIn: '1h'
    }
  );

  const refreshToken = jwt.sign(
    {
      id: user.id
    },
    refreshSecret,
    {
      expiresIn: '7d'
    }
  );
  return [token, refreshToken];
};
export const refreshTokens = async (token, refreshToken, entities) => {
  let userId;
  try {
    const json = jwt.decode(refreshToken);
    if (json) {
      userId = json['id'];
    }
  } catch (err) {
    return {};
  }
  if (!userId) {
    return {};
  }
  const user = await entities.User.findOne({
    where: { id: userId },
    raw: true
  });
  if (!user) {
    return {};
  }
  const refreshSecret = user.password + Config.refreshTokenSecret;
  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }
  const [newToken, newRefreshToken] = await createTokens(
    user,
    Config.tokenSecret,
    refreshSecret
  );
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user
  };
};

export const tryLogin = async (email, password, entities) => {
  const user = await entities.User.findOne({ where: { email }, raw: true });
  if (!user) {
    // user with provided email not found
    return {
      ok: false,
      errors: [{ path: 'email', message: 'Wrong email' }]
    };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    // bad password
    return {
      ok: false,
      errors: [{ path: 'password', message: 'Wrong password' }]
    };
  }
  const refreshTokenSecret = user.password + Config.refreshTokenSecret;
  const [token, refreshToken] = await createTokens(
    user,
    Config.tokenSecret,
    refreshTokenSecret
  );
  return {
    ok: true,
    errors: null,
    token,
    refreshToken
  };
};
