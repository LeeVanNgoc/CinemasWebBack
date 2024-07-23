import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import User from './User';
import Showtime from './Showtime';
import Seat from './Seat';

class Ticket extends Model {
  public id!: string;
  public userId!: number;
  public showtimeId!: string;
  public seatId!: string;
  public price!: number;
  public paymentMethod!: string;
  public purchaseDate!: Date;
}

Ticket.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  showtimeId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Showtime,
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
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Ticket',
  tableName: 'Tickets',
  timestamps: true,
});

Ticket.belongsTo(User, { foreignKey: 'userId' });
Ticket.belongsTo(Showtime, { foreignKey: 'showtimeId' });
Ticket.belongsTo(Seat, { foreignKey: 'seatId' });
User.hasMany(Ticket, { foreignKey: 'userId' });
Showtime.hasMany(Ticket, { foreignKey: 'showtimeId' });
Seat.hasMany(Ticket, { foreignKey: 'seatId' });

export default Ticket;