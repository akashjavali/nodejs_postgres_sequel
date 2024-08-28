import {
  createProduct,
  deleteAllProducts,
  deleteProduct,
  getAllProducts,
  getAllProductsByUserId,
  getProductById,
  getPublishedProducts,
  productsUpload,
  updateProduct,
  updateProductByUserId,
} from '@Controllers/Product';
import { Router } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 10000000 } });

const productRoute = () => {
  const router = Router();

  router.get('/', getAllProducts);

  router.get('/user/:userId', getAllProductsByUserId);

  router.get('/published', getPublishedProducts);

  router.post('/', createProduct);

  router.post('/upload', upload.array('image', 5), productsUpload);

  router.get('/:id', getProductById);

  router.put('/:id', updateProduct);

  router.put('/:id/user/:userId', updateProductByUserId);

  router.delete('/:id', deleteProduct);

  router.delete('/', deleteAllProducts);

  return router;
};

export { productRoute };
