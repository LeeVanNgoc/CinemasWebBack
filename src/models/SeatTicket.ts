import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Tickets from './Tickets';
import Seat from './Seat';
class SeatTickets extends Model {
	public stId!: number;
  	public seatId!: number;
  	public ticketId!: number;
}

SeatTickets.init({
  stId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  seatId: {
    type: DataTypes.STRING,
    allowNull: false,
	references: {
		model: Seat,
		key: 'id',
	  },
  },
  ticketId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Tickets,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Seat',
});

Seat.belongsTo(Seat, { foreignKey:'seatId' });
Tickets.belongsTo(Tickets, { foreignKey:'ticketId' });

export default SeatTickets;