import { Router } from 'express';
import { authRoute } from './Auth';
import { productRoute } from './Product';
import { userRoute } from './User';
import { verifyJWT } from '@Middleware';

const router = Router();

router.use('/auth', authRoute());

router.use(verifyJWT);

/* Import Routes */
router.use('/users', userRoute());
router.use('/products', productRoute());

export { router };
