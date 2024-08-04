import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connectDB';
import Tickets from './Tickets';
import Seat from './Seat';
class SeatTickets extends Model {
	public seatTicketId!: number;
  public seatId!: number;
  public ticketId!: number;
  public screenDate!: Date;
  public isBooked!: Boolean;
}

SeatTickets.init({
  seatTicketId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  seatId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Seat,
      key: 'seatId',
    },
  },
  ticketId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tickets,
      key: 'ticketId',
    },
  },
  screenDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    get() {
      const rawDate = this.getDataValue('screenDate');
      const [year, month, day] = rawDate.split('-');
      return `${day}/${month}/${year}`; // Trả về định dạng DD/MM/YYYY khi lấy từ cơ sở dữ liệu
    },
    set(value : string) {
      const [day, month, year] = value.split('/');
      this.setDataValue('screenDate', `${year}-${month}-${day}`); // Lưu lại dưới dạng YYYY-MM-DD
    }
  },
  isBooked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  sequelize,
  modelName: 'SeatTickets',
  timestamps: false,
});

SeatTickets.belongsTo(Seat, { foreignKey:'seatId' });
// SeatTickets.belongsTo(Tickets, { foreignKey:'ticketId' });

export default SeatTickets;