import { Request, Response, NextFunction } from "express";
import { TransactionServices } from "../services/transactionServices";
import transactionSchema from "../schemas/transactionSchema";

class TransactionController {
  static async getAllTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const data = await TransactionServices.getAllTransaction();

      return res.status(200).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const id = res.locals.loginSession.id;
      const { error, value } = transactionSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          status: 401,
          message: error.message,
          data: null,
        });
      }

      const payload = {
        ...value,
        user_id: id,
      };

      const data = await TransactionServices.createTransaction(payload);

      return res.status(data.status).json({
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
