import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeConnection } from '@Database';
import type { UserT } from '@Utils/Types';

export interface UserInput extends Optional<UserT, 'name'> {}
export interface UserOutput extends Required<UserT> {}

class User extends Model<UserT, UserInput> implements UserT {
  public name!: string;
  public email!: string;
  public password!: string;
  public id!: number;
  public roles!: {
    User: string;
  };
  public refreshToken!: string;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roles: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: 'users',
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default User;
