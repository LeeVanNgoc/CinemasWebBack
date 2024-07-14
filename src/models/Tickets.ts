import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import User from './User';
import Theater from './Theater';
import Seat from './Seat';
import Room from './Room';
import Movie from './Movie';
import Payment from './Payment';

class Tickets extends Model {
  public ticketId!: number;
  public userId!: string;
  public showtimeId!: string;
  public seatId!: string;
  public roomId!: string;
  public movieId!: string;
  public paymentId!: string;
  public price!: string;
  public TicketsDate!: Date;
}

Tickets.init({
  ticketId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  theaterId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Theater,
      key: 'id',
    },
  },
  seatId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Seat,
      key: 'id',
    },
  },
  roomId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Room,
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
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Payment,
      key: 'id',
    },
  },
  TicketsDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Tickets',
});

Tickets.belongsTo(User, { foreignKey:'userId' });
Tickets.belongsTo(Seat, { foreignKey:'seatId' });
Tickets.belongsTo(Theater, { foreignKey:'theaterId' });
Tickets.belongsTo(Movie, { foreignKey:'movieId' });
Tickets.belongsTo(Payment, { foreignKey:'paymentId' });

export default Tickets;