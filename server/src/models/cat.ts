import {
  DataTypes,
  Sequelize,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import { User } from "./user.js";

export class Cat extends Model<
  InferAttributes<Cat>,
  InferCreationAttributes<Cat>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare avatar?: string;
  declare skin: string;
  declare personality: string; // we are using this to narrow down the user's chatGPT prompts with the cat
  // did not include the createdAt in here, sequelize will create that by itself since timestamps are set to true
  declare mood: number; // this is going to be initialized as unsigned int
  declare deathFlag: number;
  declare isAlive: boolean;
  declare userId: ForeignKey<User["id"]> | null;
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
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        //add default value when no avatar is available
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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: User,
          key: "id",
        },
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
