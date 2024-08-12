import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connectDB";

class Posts extends Model {
  public postId!: number;
  public postCode!: string;
  public title!: string;
  public content!: string;
  public postDate!: Date;
  public image!: string;
}

Posts.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    postCode: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Posts",
    timestamps: false,
  }
);

export default Posts;
