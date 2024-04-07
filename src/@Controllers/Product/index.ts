import { Product } from '@Models';
import { Request, Response } from 'express';
import { Op } from 'sequelize';

const getAllProducts = async (req: Request, res: Response) => {
  const { name, page = 1, limit = 10 } = req.query;
  let offset = 0 + (Number(page) - 1) * Number(limit);

  const filters: Record<string, any> = {};
  if (name) {
    filters.name = {
      [Op.like]: `${name}%`,
    };
  }

  const products = await Product.findAndCountAll({
    where: filters,
    order: [
      ['price', 'ASC'],
      ['rating', 'ASC'],
    ],
    limit: Number(limit),
    offset: offset,
  });
  res.send({
    status: 200,
    data: products,
  });

  return products;
};

const getAllProductsByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const products = await Product.findAll({
    where: {
      createdBy: userId,
    },
  });
  res.send({
    status: 200,
    data: products,
  });
};

const getPublishedProducts = async (req: Request, res: Response) => {
  const publishedProducts = await Product.findAll({
    where: { published: true },
  });
  if (publishedProducts) {
    res.send({ status: 200, data: publishedProducts });
  } else {
    res.send({ status: 400, message: 'Something went wrong' });
  }
};

const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findByPk(req.params.id);
  res.send({
    status: 200,
    data: product,
  });
  return product;
};

const createProduct = async (req: Request, res: Response) => {
  const newProduct = await Product.create(req.body);
  if (newProduct) {
    res.send({ status: 200, data: newProduct });
  } else {
    res.send({ status: 404, message: 'Something went wrong' });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const findProduct = await Product.findByPk(req.params.id);
  if (!findProduct) {
    res.send({ status: 404, message: 'Product not found' });
    throw new Error('Product not found');
  }
  const updateProduct = await (findProduct as Product).update(req.body);
  if (updateProduct) {
    return res.send({
      status: 200,
      data: updateProduct,
      message: 'Product Updated',
    });
  }
};

const updateProductByUserId = async (req: Request, res: Response) => {
  const findProduct = await Product.findOne({
    where: {
      id: req.params.id,
      createdBy: req.params.userId,
    },
  });
  console.log(findProduct, 'findProduct');

  if (!findProduct) {
    res.send({ status: 404, message: 'Product not found' });
    throw new Error('Product not found');
  }
  const final = {
    ...req.body,
    updatedBy: parseInt(req.params.userId as string),
  };
  const updateProduct = await (findProduct as Product).update(final);
  if (updateProduct) {
    return res.send({
      status: 200,
      data: updateProduct,
      message: 'Product Updated by user',
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const deleteProduct = await Product.destroy({
    where: { id: req.params.id },
  });

  if (deleteProduct) {
    res.send({ status: 200, message: 'Product deleted' });
  } else {
    res.send({
      status: 400,
      message: 'Please check the Id',
    });
  }
};

const deleteAllProducts = async (req: Request, res: Response) => {
  const deleteAll = await Product.destroy({
    truncate: true,
  });
  if (deleteAll) {
    res.send({ status: 200, message: 'All Products deleted' });
  } else {
    res.send({
      status: 500,
      message: 'Something went wrong',
    });
  }
};

const productsUpload = async (req: Request, res: Response) => {
  res.send(req.files);
};

export {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
  getPublishedProducts,
  getAllProductsByUserId,
  updateProductByUserId,
  productsUpload,
};
