import { User, Product } from '@Models';

/**
 * Creating development
 */
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Initialize all the required tables
 */
const dbInit = async () => {
  try {
    await Promise.all([
      User.sync({ alter: isDevelopment }),
      Product.sync({ alter: isDevelopment }),
    ]);
    console.log('Database synchronization complete');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

export default dbInit;
