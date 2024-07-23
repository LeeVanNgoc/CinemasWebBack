import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

class Admin extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
}

Admin.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
}, {
  sequelize,
  modelName: 'Admin',
  tableName: 'Admins',
  timestamps: true,
});

export default Admin;