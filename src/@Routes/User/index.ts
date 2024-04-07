import { ROLES_LIST } from '@Constants';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '@Controllers/User';
import { verifyRoles } from '@Middleware';

import { Router } from 'express';

const userRoute = () => {
  const router = Router();

  router.get('/', getAllUsers);

  router.post('/', verifyRoles(ROLES_LIST.Admin), createUser);

  router.get('/:id', getUserById);

  router.put('/:id', verifyRoles(ROLES_LIST.Admin), updateUser);

  router.delete('/:id', verifyRoles(ROLES_LIST.Admin), deleteUser);

  return router;
};

export { userRoute };
