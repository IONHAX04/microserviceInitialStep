import dbConnection from "../../helper/db";
import { default as Logger } from "../../helper/logger";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { reject } from "lodash";

dotenv.config();

const JWT_SECRET = process.env.ACCESS_TOKEN || "default_secret_key";
if (!JWT_SECRET) {
  console.log("JWT_SECRET", JWT_SECRET);
  throw new Error("JWT_SECRET is not defined");
}

export default class StaffRepository {
  // STAFF LOGIN
  public async staffLoginV1(
    data: { user_id: string; password: string },
    domain_code?: string
  ): Promise<{ success: boolean; message: string; token?: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const userResult = await dbConnection.query(
          `SELECT * FROM "UBLIS".ublisusers WHERE "refStCustId" = $1`,
          [data.user_id]
        );

        console.log("\n\n Staff Results \n\n", userResult);
        if (userResult.rows.length > 0) {
          const validPassword = await bcrypt.compare(
            data.password,
            userResult.rows[0].refStHashedPassword
          );
          if (validPassword) {
            const token = jwt.sign(
              { user_id: userResult.rows[0].refStCustId },
              JWT_SECRET,
              { expiresIn: "20m" }
            );
            resolve({
              success: true,
              message: "Staff login successful",
              token,
            });
          } else {
            resolve({
              success: false,
              message: "Invalid staff id or password",
            });
          }
        } else {
          resolve({
            success: false,
            message: "Invalid staff id or password",
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

  // USER DATA FETCHING
  public async getUserDataV1(
    data?: {},
    domain_code?: string
  ): Promise<{
    success: boolean;
    message: string;
    userData?: any;
    count?: number;
    token?: string;
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        //get user data
        const userDataResult = await dbConnection.query(
          `SELECT * FROM "UBLIS".ublisusers 
           WHERE "refUtId" = $1 AND "refIsRejected" IS NULL`,
          [1]
        );

        if (userDataResult.rows.length > 0) {
          const count = userDataResult.rows[0].count;
          resolve({
            success: true,
            message: "User data retrieved successfully",
            userData: userDataResult.rows,
            count,
          });
        } else {
          resolve({
            success: false,
            message: "No valid user data found",
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
