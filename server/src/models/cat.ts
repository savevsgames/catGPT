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

export class Cat extends Model<
  InferAttributes<Cat>,
  InferCreationAttributes<Cat>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare skin: string;
  declare personality: string; // we are using this to narrow down the user's chatGPT prompts with the cat
  // did not include the createdAt in here, sequelize will create that by itself since timestamps are set to true
  declare mood: number; // this is going to be initialized as unsigned int
  declare deathFlag: number;
  declare isAlive: boolean;
  declare userId: ForeignKey<User["id"]>;
}

export function CatFactory(sequelize: Sequelize) {
  Cat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      skin: {
        type: DataTypes.STRING, // still verify what the skin is for. weird
        allowNull: true,
      },
      personality: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mood: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        // defaultValue:
      },
      deathFlag: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isAlive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      updatedAt: false,
      tableName: "cats",
    }
  );
  return Cat;
}
