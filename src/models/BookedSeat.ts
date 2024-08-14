import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import Room from "./Room";
import PlanScreenMovie from "./PlanScreenMovie";

class BookedSeat extends Model {
  public bookedSeatId!: number;
  public bookedSeatCode!: string;
  public planScreenMovieCode!: string;
  public roomCode!: string;
  public row!: string;
  public col!: number;
}

BookedSeat.init(
  {
    bookedSeatId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bookedSeatCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    planScreenMovieCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "PlanScreenMovie",
        key: "planScreenMovieCode",
      },
    },
    roomCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Room,
        key: "roomCode",
      },
    },
    row: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    col: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "BookedSeat",
    timestamps: false,
  }
);

BookedSeat.belongsTo(Room, { foreignKey: "roomCode" });
BookedSeat.belongsTo(PlanScreenMovie, { foreignKey: "planScreenMovieCode" });
export default BookedSeat;
