import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

class News extends Model {
  public postId!: number;
  public title!: string;
  public content!: string;
  public readonly postDate!: Date;
}

News.init({
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
  modelName: 'News',
  timestamps: false
});

export default News;