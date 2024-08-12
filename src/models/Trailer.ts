import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connectDB";
import Movie from "./Movie";
import Seat from "./Seat";

class Trailer extends Model {
  public trailerId!: number;
  public trailerCode!: string;
  public movieId!: string;
  public link!: string;
}

Trailer.init(
  {
    trailerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    trailerCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Movie,
        key: "id",
      },
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Trailer",
    timestamps: false,
  }
);

Trailer.belongsTo(Movie, { foreignKey: "movieId" });

export default Trailer;
