import { Model, DataTypes, DateOnlyDataType, Association } from "sequelize";
import sequelize from "../config/connectDB";
import Room from "./Room";
import Movie from "./Movie";
import Tickets from "./Tickets";

class PlanScreenMovie extends Model {
  public planScreenMovieId!: number;
  public planScreenMovieCode!: string;
  public roomCode!: string;
  public movieCode!: string;
  public startTime!: TimeRanges;
  public endTime!: TimeRanges;
  public dateScreen!: DateOnlyDataType;
  public movie?: Movie;

  public static associations: {
    movie: Association<PlanScreenMovie, Movie>;
  };
}

PlanScreenMovie.init(
  {
    planScreenMovieId: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true,
      allowNull: false,
    },
    planScreenMovieCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Room,
        key: "roomCode",
      },
    },
    movieCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Movie,
        key: "movieCode",
      },
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    dateScreen: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PlanScreenMovie",
    tableName: "planscreenmovie",
    timestamps: false,
  }
);

PlanScreenMovie.belongsTo(Movie, {
  foreignKey: 'movieCode',
  targetKey: 'movieCode',
  as: 'movie'
});

PlanScreenMovie.belongsTo(Room, {
  foreignKey: 'roomCode',
  targetKey: 'roomCode',
  as: 'room',
});

export default PlanScreenMovie;