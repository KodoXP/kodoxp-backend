import { Optional } from "sequelize";

export interface UsersAttributes {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  number: string;
  password: string;
  zipcode: string;
  is_active: boolean;
  points: number;
}

export interface UsersCreate extends Optional<
  UsersAttributes,
  "id" | "is_active" | "cpf" | "points" | "number" | "zipcode"
> {}
