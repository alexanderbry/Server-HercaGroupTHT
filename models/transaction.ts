"use strict";
import { Model } from "sequelize";

interface TransactionAttributes {
  transaction_number: string;
  marketing_id: number;
  date: string;
  cargo_fee: number;
  total_balance: number;
  grand_total: number;
  user_id: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Transaction
    extends Model<TransactionAttributes>
    implements TransactionAttributes
  {
    transaction_number!: string;
    marketing_id!: number;
    date!: string;
    cargo_fee!: number;
    total_balance!: number;
    grand_total!: number;
    user_id!: number;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
      Transaction.belongsTo(models.Marketing, {
        foreignKey: "marketing_id",
      });
      Transaction.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }

  Transaction.init(
    {
      transaction_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Transaction number is required",
          },
        },
      },
      marketing_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Marketing ID is required",
          },
        },
      },
      date: {
        type: DataTypes.STRING,
      },
      cargo_fee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total_balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      grand_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User ID is required",
          },
        },
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      timestamps: true,
      hooks: {
        beforeValidate: async (transaction: any, options: any) => {
          if (!transaction.transaction_number) {
            const lastTransaction = await Transaction.findOne({
              order: [["createdAt", "DESC"]],
              attributes: ["transaction_number"],
            });

            let nextNumber = 1;
            if (lastTransaction && lastTransaction.transaction_number) {
              const lastNumber = parseInt(
                lastTransaction.transaction_number.split("-")[1]
              );
              nextNumber = lastNumber + 1;
            }

            if (nextNumber > 100) {
              throw new Error("Transaction number limit reached");
            }

            const paddedNumber = nextNumber.toString().padStart(3, "0");
            transaction.transaction_number = `TRX-${paddedNumber}`;
          }
        },
        beforeCreate: (transaction: any) => {
          transaction.createdAt = new Date(transaction.createdAt)
            .toISOString()
            .split("T")[0];
          transaction.updatedAt = new Date(transaction.updatedAt)
            .toISOString()
            .split("T")[0];
        },
        beforeUpdate: (transaction: any) => {
          transaction.updatedAt = new Date().toISOString().split("T")[0];
        },
      },
    }
  );

  return Transaction;
};
