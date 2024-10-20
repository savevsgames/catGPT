import {
  DataTypes,
  Sequelize,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import { User } from "./user";
import { Cat } from "./cat";

export class Interaction extends Model<
  InferAttributes<Interaction>,
  InferCreationAttributes<Interaction>
> {
  declare id: CreationOptional<number>;
  declare interactionType: "play" | "gift" | "feed"; // defining the possible interaction types
  declare interactionDate: Date;
  declare description?: string;
  declare userId: ForeignKey<User["id"]>;
  declare catId: ForeignKey<Cat["id"]>;
}

export function InteractionFactory(sequelize: Sequelize) {
  Interaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      interactionType: {
        type: DataTypes.ENUM("play", "gift", "feed"),
        allowNull: false,
      },
      interactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now, // it defaults to the current data/time
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "interactions",
    }
  );
  return Interaction;
}
