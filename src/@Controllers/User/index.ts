import { User } from '@Models';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const getAllUsers = async (req: Request, res: Response): Promise<User[]> => {
  const users = await User.findAll();
  res.send({
    status: 200,
    data: users,
  });
  return users;
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const findUser = await User.findByPk(id);
  if (findUser) {
    res.send({ status: 200, data: findUser });
  } else {
    res.send({ status: 404, message: 'User not found' });
  }
};

const createUser = async (req: Request, res: Response): Promise<User> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    res.send({
      status: 400,
      message: 'Name and Username and password are required.',
    });
  const duplicatedUser = await User.findOne({
    where: {
      email: email,
    },
  });

  if (duplicatedUser) res.sendStatus(409);
  const hashedPassword = await bcrypt.hash(password, 10);

  const final = {
    name: name,
    email: email,
    password: hashedPassword,
    roles: {
      User: 'User',
    },
  };

  const newUser = await User.create(final);

  if (!!newUser) {
    res.send({
      status: 200,
      message: 'User created',
      data: newUser,
    });
  } else {
    res.send({
      status: 400,
      message: 'something went wrong',
    });
  }
  return newUser;
};

const updateUser = async (req: Request, res: Response): Promise<User> => {
  const { name, email, password } = req.body;
  // if (!name || !email || !password)
  //   res.send({
  //     status: 400,
  //     message: 'Name and Username and password are required.',
  //   });

  const findUser = await User.findByPk(req.params.id);

  if (!findUser) {
    res.send({ status: 404, message: 'User not found' });
    throw new Error('User not found');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const final = {
    name: name,
    email: email,
    password: hashedPassword,
    roles: {
      User: 'User',
    },
  };

  const updatedUser = await (findUser as User).update(final);
  if (!!updatedUser) {
    res.send({ status: 200, message: 'User Updated', data: updatedUser });
  } else {
    res.send({ status: 404, message: 'Something went wrong' });
  }
  return updatedUser;
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleteUser = await User.destroy({
    where: { id },
  });

  if (deleteUser) {
    res.send({ status: 200, message: 'User Deleted' });
  } else {
    res.send({ status: 404, message: 'Something went wrong' });
  }
};

export { createUser, getAllUsers, updateUser, deleteUser, getUserById };
