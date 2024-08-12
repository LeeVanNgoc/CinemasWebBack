import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connectDB";

class Promotion extends Model {
  public promoId!: number;
  public promoCode!: string;
  public description!: string;
  public discount!: string;
  public startDate!: Date;
  public endDate!: Date;
}

Promotion.init(
  {
    promoId: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      allowNull: false,
      primaryKey: true,
    },
    promoCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Promotion",
    tableName: "Promotions",
    timestamps: false,
  }
);

export default Promotion;
