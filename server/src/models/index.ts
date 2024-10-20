import sequelize from "../config/connection.js";
import { UserFactory } from "./user.js";
import { CatFactory } from "./cat.js";
import { InteractionFactory } from "./interaction.js";

// initialize the models
const User = UserFactory(sequelize);
const Cat = CatFactory(sequelize);
const Interaction = InteractionFactory(sequelize);

// create the associations between the models

// ---------- user-cat association (one-to-many) -----------------
// a user can have many cats
User.hasMany(Cat, {
  onDelete: "CASCADE",
  foreignKey: "userId",
  as: "cats",
});
// but a cat belongs to only one user
Cat.belongsTo(User, {
  foreignKey: "userId",
  as: "owner",
});

// ----------- cat-interaction association (one-to-many)-------------
// a cat can have many interactions
Cat.hasMany(Interaction, {
  onDelete: "CASCADE",
  foreignKey: "catId",
  as: "interactions",
});
// but each interaction affects one cat
Interaction.belongsTo(Cat, {
  foreignKey: "catId",
  as: "cat",
});

// ------------ user-interaction association (one-to-many) --------------
// a user can have many interactions
User.hasMany(Interaction, {
  onDelete: "CASCADE",
  foreignKey: "userId",
  as: "interactions",
});
// but each interaction is made by one user
Interaction.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export { User, Cat, Interaction };
