import { Optional } from "sequelize";

export enum RewardCategory {
  GAMES = "GAMES",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  FOOD = "FOOD",
  ENTERTAINMENT = "ENTERTAINMENT",
  SHOPPING = "SHOPPING",          
  HOBBIES = "HOBBIES",             
  TRAVEL = "TRAVEL",               
  OTHER = "OTHER",
  UNDEFINED = "UNDEFINED"
};
export interface RewardAttributes {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  points_cost: number;
  stock: number;
  is_active: boolean;
  category: RewardCategory;
  expiration_date: Date;
  image_url: string;
}

export interface RewardCreate extends Optional<RewardAttributes, "id" | "is_active" > {}