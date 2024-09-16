import dbConnection from "../../helper/db";
import { default as Logger } from "../.././helper/logger";

export default class UserRepository {
  public async userLogin(
    data: { email: string; password: string },
    domain_url?: string
  ): Promise<{ success: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      Logger.info("User login API triggered --- ");
      try {
        const result = await dbConnection.query(
          "SELECT * FROM users WHERE email = $1 AND password = $2",
          [data.email, data.password]
        );

        if (result.rows.length > 0) {
          resolve({
            success: true,
            message: "Login successful",
          });
        } else {
          resolve({
            success: false,
            message: "Invalid email or password",
          });
        }
      } catch (error) {
        Logger.error("Error in userLogin:", error);
        reject({
          success: false,
          message: "Database error",
        });
      }
    });
  }
}
