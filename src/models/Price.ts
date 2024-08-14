import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connectDB";

class Price extends Model {
  public priceId!: number;
  public priceCode!: string;
  public cost!: number;
  public roomType!: string;
  public seatType!: string;
  public isWeekend!: boolean;
  public timeFrame!: string;

}

Price.init(
  {
    priceId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    priceCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seatType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isWeekend: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    timeFrame: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Prices",
    timestamps: false,
  }
);

export default Price;
