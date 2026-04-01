import User from "./user";
import Rewards from "./rewards";

Rewards.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
})

User.hasMany(Rewards, {
  foreignKey: "user_id",
  as: "rewards"
});

export default { User, Rewards};