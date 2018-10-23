import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const createTokens = async (user, secret, secret2) => {
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
    secret2,
    {
      expiresIn: '7d'
    }
  );
  return [token, refreshToken];
};

export const refreshTokens = async (
  token,
  refreshToken,
  entities,
  secret,
  secret2
) => {
  let userId = 0;
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

  const refreshSecret = user.password + secret2;

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }
  const [newToken, newRefreshToken] = await createTokens(
    user,
    secret,
    refreshSecret
  );
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user
  };
};

export const tryLogin = async (email, password, entities, SECRET, SECRET2) => {
  console.log(email);
  const user = await entities.User.findOne({ where: { email }, raw: true });
  if (!user) {
    // user with provided email not found
    return {
      ok: false,
      errors: [{ path: 'email', message: 'Wrong email' }]
    };
  }
  console.log(user);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    // bad password
    return {
      ok: false,
      errors: [{ path: 'password', message: 'Wrong password' }]
    };
  }

  const refreshTokenSecret = user.password + SECRET2;

  const [token, refreshToken] = await createTokens(
    user,
    SECRET,
    refreshTokenSecret
  );
  console.log(token);

  return {
    ok: true,
    errors: null,
    token,
    refreshToken
  };
};
