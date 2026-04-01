import User from "./user";
import Rewards from "./rewards";
import Tasks from "./tasks";
Rewards.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

User.hasMany(Rewards, {
  foreignKey: "user_id",
  as: "rewards",
});

Tasks.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Tasks, { foreignKey: "user_id", as: "tasks" });

export default { User, Rewards };
