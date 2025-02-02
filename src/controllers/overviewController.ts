import { Request, Response, NextFunction } from "express";
import { OverviewServices } from "../services/overviewServices";

export class OverviewController {
  static async getOverview(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const data = await OverviewServices.getOverview();

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