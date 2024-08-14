import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import User from "./User";
import PlanScreenMovie from "./PlanScreenMovie";

class Tickets extends Model {
  public ticketId!: number;
  public ticketCode!: string;
  public userCode!: string;
  public planScreenMovieCode!: string;
  public seats!: string;
  public bank!: string;
  public totalPrice!: number;
  public TicketsDate!: Date;
}

Tickets.init(
  {
    ticketId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    ticketCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "userCode",
      },
    },
    planScreenMovieCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: PlanScreenMovie,
        key: "planScreenMovieCode",
      },
    },
    seats: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ticketsDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Tickets",
    timestamps: false,
  }
);

Tickets.belongsTo(User, { foreignKey: "userCode" });
Tickets.belongsTo(PlanScreenMovie, {
  foreignKey: "planScreenMovieCode",
  as: "planScreenMovie",
});

export default Tickets;
