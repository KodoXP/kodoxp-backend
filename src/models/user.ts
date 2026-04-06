import { UsersAttributes, UsersCreate } from "@/dtos/user-dto";
import { DataTypes, Model } from "sequelize";
import sequelize from "@/config/sequelize";
import Tasks from "./tasks";
import Rewards from "./rewards";

class User extends Model<UsersAttributes, UsersCreate> {
  declare id: string;
  declare name: string;
  declare cpf: string;
  declare number: string;
  declare password: string;
  declare zipcode: string;
  declare email: string;
  declare is_active: boolean;
  declare points: number;

  declare taks: Tasks[];
  declare rewards: Rewards[];

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    number: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [10, 15],
      },
    },
    cpf: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        len: [11, 14],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, tableName: "users", timestamps: true, underscored: true },
);

export default User;
