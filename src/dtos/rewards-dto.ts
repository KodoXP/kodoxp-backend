import { Optional } from "sequelize";

export type RewardCategory = "GAMES" | "REDE SOCIAL" | "COMIDA" | "OUTROS";

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