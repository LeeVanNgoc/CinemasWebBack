import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

class User extends Model {
  public userId!: number;
  public username!: string;
  public email!: string;
  public password!: string;
}

User.init({
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
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
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users',
  timestamps: false,
});

export default User;