import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Theater from './Theater'
import Movie from './Movie';
import Payment from './Payment';
class Room extends Model {
  public roomId!: number;
  public paymentId!: number;

  public theaterId!: string;
  public movieid!: string;
  public status!: string;
  public type!: string;
}

Room.init({
  roomId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  theaterId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Theater,
      key: 'id',
    },
  },
  movieId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Movie,
      key: 'id',
    },
  },
  paymentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Payment,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Room',
});

Room.belongsTo(Theater, { foreignKey:'theaterId' });
Room.belongsTo(Movie, { foreignKey:'movieId' });
Room.belongsTo(Payment, { foreignKey:'paymentId' });

export default Room;