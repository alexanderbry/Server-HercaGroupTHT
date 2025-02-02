import db from "../../models/index";

export class TransactionServices {
  static async getAllTransaction(): Promise<any> {
    try {
      const data = await db.Transaction.findAll();
      if (!data) throw { name: "Not Found" };

      if (data.length === 0)
        return {
          status: 200,
          message: "Data is empty",
          data: null,
        };

      return {
        status: 200,
        message: null,
        data: data,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async createTransaction(payload: any): Promise<any> {
    try {
      const { marketing_id, cargo_fee, total_balance, user_id } = payload;

      const latestTransaction = await db.Transaction.findOne({
        order: [["transaction_number", "DESC"]],
        attributes: ["transaction_number"],
      });

      let serialNumber = 1;

      if (latestTransaction) {
        const latestNumber = latestTransaction.transaction_number.slice(3);
        serialNumber = parseInt(latestNumber, 10) + 1;
      }

      const formattedSerial = serialNumber.toString().padStart(3, "0");
      const transaction_number = `TRX${formattedSerial}`;
      const grand_total = cargo_fee + total_balance;

      const date = new Date().toISOString().split("T")[0];

      await db.Transaction.create({
        transaction_number,
        marketing_id,
        date,
        cargo_fee,
        total_balance,
        grand_total,
        user_id,
      });

      return {
        status: 201,
        message: "Transaction has been created",
        data: null,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
