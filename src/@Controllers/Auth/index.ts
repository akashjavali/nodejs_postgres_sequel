import { User } from '@Models';
import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  const foundUser = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(password, foundUser?.dataValues.password);
  if (match) {
    const roles = Object.values(foundUser?.dataValues?.roles);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.dataValues.email,
          id: foundUser.dataValues.id,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '6h' }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.dataValues.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    //Saving refreshToken with current user
    foundUser.dataValues.refreshToken = refreshToken;
    const result = await (foundUser as User).save();
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, user: result });
  } else {
    res.sendStatus(401);
  }
};

export { login };
