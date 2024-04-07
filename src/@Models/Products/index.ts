import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeConnection } from '@Database';
import type { ProductT } from '@Utils/Types';

export interface ProductInput extends Optional<ProductT, 'name'> {}
export interface ProductOutput extends Required<ProductT> {}

class Product extends Model<ProductT, ProductInput> implements ProductT {
  public name!: string;
  public description!: string;
  public published!: boolean;
  public image!: string;
  public price!: number;
  public rating!: number;
  public createdBy!: number;
  public updatedBy!: number;
}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'products',
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Product;
