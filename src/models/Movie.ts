import { Model, DataTypes, DateOnlyDataType } from "sequelize";
import sequelize from "../config/connectDB";
import Genres from "./Genres";

class Movie extends Model {
  public movieId!: number;
  public movieCode!: string;
  public title!: string;
  public description!: string;
  public duration!: number;
  public country!: string;
  public releaseDate!: DateOnlyDataType;
  public genreId!: number;
  public image!: string;
}

Movie.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    movieCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genreCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Genres,
        key: "genreCode",
      },
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Movie",
    timestamps: false,
  }
);

export default Movie;
