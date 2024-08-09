import { Model, DataTypes, DateOnlyDataType } from 'sequelize';
import sequelize from '../config/connectDB';
import Room from './Room';
import Movie from './Movie';
import Tickets from './Tickets';

class PlanScreenMovie extends Model {
  public planScreenMovieId!: number;
  public roomId!: number;
  public movieId!: number;
  public startTime!: TimeRanges;
  public endTime!: TimeRanges;
  public dateScreen!: DateOnlyDataType;
}

PlanScreenMovie.init(
  {
    planScreenMovieId: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Room,
        key: "roomId",
      },
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Movie,
        key: "movieId",
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
      // get() {
      //   const rawDate = this.getDataValue('dateScreen');
      //   const [year, month, day] = rawDate.split('-');
      //   return `${day}/${month}/${year}`; // Trả về định dạng DD/MM/YYYY khi lấy từ cơ sở dữ liệu
      // },
      // set(value : string) {
      //   const [day, month, year] = value.split('/');
      //   this.setDataValue('dateScreen', `${year}-${month}-${day}`); // Lưu lại dưới dạng YYYY-MM-DD
      // }
    },
  },
  {
    sequelize,
    modelName: "PlanScreenMovie",
    tableName: "planscreenmovie",
    timestamps: false,
  }
);

export default PlanScreenMovie;
