import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

class New extends Model {
  public postId!: number;
  public title!: string;
  public content!: string;
  public readonly postDate!: Date;
}

New.init({
  postId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'New',
});

export default New;