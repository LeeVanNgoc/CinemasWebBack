import { Model, DataTypes, DateOnlyDataType, Association } from "sequelize";
import sequelize from "../config/connectDB";
import Genres from "./Genres";
import PlanScreenMovie from "./PlanScreenMovie";

class Movie extends Model {
  public movieId!: number;
  public movieCode!: string;
  public title!: string;
  public description!: string;
  public duration!: number;
  public country!: string;
  public releaseDate!: DateOnlyDataType;
  public genreCode!: number;
  public image!: string;

  public genre?: Genres;

  public static associations: {
    genre: Association<Movie, Genres>;
  };
}

Movie.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      // primaryKey: true,
      allowNull: false,
    },
    movieCode: {
      type: DataTypes.STRING,
      primaryKey: true,
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
    tableName: "movies",
    timestamps: false,
  }
);

// Movie.hasMany(PlanScreenMovie, {
//   foreignKey: "movieCode",
//   as: "movie",
// });

Movie.belongsTo(Genres, {
  foreignKey: 'genreCode',
  targetKey: 'genreCode',
  as: 'genre'
});

export default Movie;
