import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Admin from './Admin';


class News extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public readonly postDate!: Date;
  public admin_id!: number;
}

News.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  post_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Admin,
      key: 'id',
    }
  }
}, {
  sequelize,
  modelName: 'News',
});

News.belongsTo(Admin, { foreignKey: 'admin_id' });
Admin.hasMany(News, { foreignKey: 'admin_id' });

export default News;