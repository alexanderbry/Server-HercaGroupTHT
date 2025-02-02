import { Request, Response, NextFunction } from "express";
import { TransactionServices } from "../services/transactionServices";

class TransactionController {
  static async getAllTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const data = await TransactionServices.getAllTransaction();

      res.status(200).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default TransactionController;
