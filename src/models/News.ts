import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';

class News extends Model {
  public poseatTicketId!: number;
  public title!: string;
  public content!: string;
  public readonly postDate!: Date;
}

News.init({
  poseatTicketId: {
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
}, {
  sequelize,
  modelName: 'News',
  timestamps: false
});

export default News;