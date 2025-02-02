import db from "../models/index";
import { comparePassword } from "./helpers/bcrypt";
import { createToken } from "./helpers/jwt";

export class UserServices {
  static async register(payload: any): Promise<any> {
    try {
      const { username, password } = payload;

      const isTakenUser = await db.User.findOne({ where: { username } });
      if (isTakenUser) throw { name: "UsernameTaken" };

      await db.User.create({ username, password });

      return {
        status: 200,
        message: "Register success",
        data: null,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  static async login(payload: any): Promise<any> {
    try {
      const { username, password } = payload;

      const isValidUser = await db.User.findOne({ where: { username } });
      if (!isValidUser) throw { name: "InvalidEmail/Password" };

      const isValidPassword = comparePassword(password, isValidUser.password);
      if (!isValidPassword) throw { name: "InvalidEmail/Password" };
      
      const jwtPayload = {
        id: isValidUser.id,
        username: isValidUser.username,
      }

      const token = createToken(jwtPayload);
         
      return {
        status: 200,
        message: "Login success",
        data: token,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
