import { login } from '@Controllers/Auth';
import { Router } from 'express';

const authRoute = () => {
  const router = Router();

  router.post('/login', login);

  return router;
};

export { authRoute };
