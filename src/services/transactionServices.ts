import db from "../../models/index";

export class TransactionServices {
  static async getAllTransaction(): Promise<any> {
    try {
      const data = await db.Transaction.findAll();   
      console.log(data, "ini data");
      if(!data) throw { name: "Not Found" };
      
      if(data.length === 0) return{
        status: 200,
        message: "Data is empty",
        data: null,
      }

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
}
