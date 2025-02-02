"use strict";
import { Model } from "sequelize";
import { hashPassword } from "../src/helpers/bcrypt";

interface UserAttributes {
  username: string;
  password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    username!: string;
    password!: string;

    static associate(models: any) {
      User.hasMany(models.Transaction, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Username is required",
          },
          notEmpty: {
            msg: "Username is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user: User) => {
          user.password = hashPassword(user.password);
        },
      },
    }
  );
  return User;
};
