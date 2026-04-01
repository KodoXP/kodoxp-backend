import { RewardAttributes, RewardCreate, RewardCategory } from "@/dtos/rewards-dto";
import { DataTypes, Model } from "sequelize";
import sequelize from "@/config/sequelize";
import User from "./user";

class Rewards extends Model<RewardAttributes, RewardCreate> {
  public id!: string;
  public user_id!: string; // FK
  public title!: string;
  public description?: string;
  public points_cost!: number;
  public stock!: number;
  public is_active!: boolean;
  public category!: RewardCategory // type importado do dto;
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
      type: DataTypes.ENUM(...Object.values(RewardCategory)),
      allowNull: false,
      defaultValue: RewardCategory.UNDEFINED
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

export default Rewards;
