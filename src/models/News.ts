import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

class News extends Model {
  public newsId!: number;
  public title!: string;
  public content!: string;
  public postDate!: Date;
  public image!: string;
}

News.init({
  newsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  postDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'News',
  timestamps: false
});

export default News;