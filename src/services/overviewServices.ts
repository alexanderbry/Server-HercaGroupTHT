import { raw } from "express";
import db from "../../models";
import { log } from "node:console";

export class OverviewServices {
  static async getOverview(): Promise<any> {
    try {
      const getCommissionRate = (omzet: number): number => {
        if (omzet === 500_000_000) return 0.1;
        if (omzet >= 200_000_000) return 0.05;
        if (omzet >= 100_000_000) return 0.025;
        return 0;
      };

      const transactions = await db.Transaction.findAll({
        attributes: ["marketing_id", "date", "total_balance"],
        include: [
          {
            model: db.Marketing,
            attributes: ["name"],
          },
        ],
        raw: true,
      });

      const commisions = transactions.reduce((acc: any, transaction: any) => {
        const commissionRate = getCommissionRate(transaction.total_balance);
        const commission = transaction.total_balance * commissionRate;
        const dateParts = transaction.date.split("-");
        const monthIndex = parseInt(dateParts[1], 10) - 1;
        const monthName = new Date(0, monthIndex).toLocaleString("default", {
          month: "long",
        });

        const key = `${transaction["Marketing.name"]}-${monthName}`;

        if (!acc[key]) {
          acc[key] = {
        Marketing: transaction["Marketing.name"],
        Bulan: monthName,
        Omzet: 0,
        "Komisi %": commissionRate * 100 + " %",
        "Komisi Nominal": 0,
          };
        }

        acc[key].Omzet += transaction.total_balance;
        acc[key]["Komisi Nominal"] += commission;

        return acc;
      }, {});

      const commisionsArray = Object.values(commisions).sort((a: any, b: any) => b.Bulan.localeCompare(a.Bulan));

      return {
        status: 200,
        message: null,
        data: commisionsArray,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
