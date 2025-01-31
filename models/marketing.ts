"use strict";
import { Model } from "sequelize";

interface MarketingAttributes {
  name: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Marketing extends Model<MarketingAttributes> implements MarketingAttributes {
    id!: number;
    name!: string;
    static associate(models: any) {
     Marketing.hasMany(models.Transaction)
    }
  }
  Marketing.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      }
    },
    {
      sequelize,
      modelName: "Marketing",
    }
  );
  return Marketing;
};
