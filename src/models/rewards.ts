import { DataTypes, Model } from "sequelize";
import sequelize from "@/config/sequelize";
import User from "./user";

export type RewardCategory = "GAMES" | "REDE SOCIAL" | "COMIDA" | "OUTROS";

class Rewards extends Model {
  public id!: string;
  public user_id!: string; // FK
  public title!: string;
  public description?: string;
  public points_cost!: number;
  public stock!: number;
  public is_active!: boolean;
  public category!: RewardCategory;
  public expiration_date!: Date;
  public image_url!: string;

  public user!: User; // permite que Rewards tenha acesso aos dados do User

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Rewards.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    points_cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("GAMES" , "REDE SOCIAL" , "COMIDA" , "OUTROS"),
      allowNull: false,
    },
    expiration_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, tableName: "rewards", timestamps: true, underscored: true },
);

// define que a recompensa pertence à um user
Rewards.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
})

export default Rewards;
