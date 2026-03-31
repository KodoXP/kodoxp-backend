import { UsersAttributes, UsersCreate } from "@/dtos/user-dto";
import { DataTypes, Model } from "sequelize";
import sequelize from "@/config/sequelize";
import Tasks from "./tasks";
import Rewards from "./rewards";

class User extends Model<UsersAttributes, UsersCreate> {
  public id!: string;
  public name!: string;
  public cpf!: string;
  public number!: string;
  public password!: string;
  public zipcode!: string;
  public email!: string;
  public isActive!: boolean;

  public taks!: Tasks[];
  public rewards!: Rewards[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
      allowNull: false,
      validate: {
        len: [10, 15],
      },
    },
    cpf: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [11, 14],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, tableName: "users", timestamps: true, underscored: true },
);
export default User;
