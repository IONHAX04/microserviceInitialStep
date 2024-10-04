import dbConnection from "../../helper/db";
import { default as Logger } from "../.././helper/logger";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export default class UserRepository {
  // LOGIN REPOSITORY FUNCTION
  public async userLoginV1(
    data: { user_id: string; password: string },
    domain_code?: string
  ): Promise<{ success: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      Logger.info("User login API triggered --- ");
      try {
        // USERS TABLE
        const userResult = await dbConnection.query(
          `SELECT * FROM "UBLIS".ublisusers WHERE "refStCustId" = $1`,
          [data.user_id]
        );

        console.log("\n\nuserResult\n\n", userResult);
        if (userResult.rows.length > 0) {
          const validPassword = await bcrypt.compare(
            data.password,
            userResult.rows[0].refStHashedPassword
          );
          if (validPassword) {
            resolve({
              success: true,
              message: "User login successful",
            });
          } else {
            resolve({
              success: false,
              message: "Invalid user id or password",
            });
          }
        } else {
          resolve({
            success: false,
            message: "Invalid user id or password",
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

  // SIGN UP REPOSITORY FUNCTION
  public async userSignUpV1(
    data: {
      temp_su_email: string;
      temp_su_password: string;
      domain?: string;
      temp_su_fname: string;
      temp_su_lname: string;
      temp_su_dob: string;
      temp_su_age: string;
      temp_su_mobile: string;
    },
    domain_url?: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      console.log("Testing one line 87");
      // SALT
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        data.temp_su_password,
        saltRounds
      );
      const currentTimestamp = new Date().toISOString();

      const refStId = uuidv4();
      console.log("refStId", refStId);

      const history = JSON.stringify([
        {
          createdAt: currentTimestamp,
          createdBy: domain_url || "system",
        },
        {
          updatedAt: currentTimestamp,
          updatedBy: domain_url || "system",
        },
      ]);

      // TO CREATE THE CUST ID
      const userCountResult = await dbConnection.query(
        `SELECT COUNT(*) FROM "UBLIS".ublisUsers`
      );
      const userCount = parseInt(userCountResult.rows[0].count, 10);
      const newCustomerId = `UBY${(10000 + userCount + 1).toString()}`;

      const result = await dbConnection.query(
        `INSERT INTO "UBLIS".ublisUsers (
          "refStId",
          "refStEmail",
          "refStPassword",
          "refStHashedPassword",
          "refStFName",
          "refStLName",
          "refStDOB",
          "refStAge",
          "refStCreatedAt",
          "refStCreatedBy",
          "refStUpdatedAt",
          "refStUpdatedBy",
          "refStUserStatus",
          "refStIsActive",
          "refSignUpDate",
          "refUtHistory",
          "refStCustId",
          "refUtId"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *`,
        [
          refStId,
          data.temp_su_email,
          data.temp_su_password,
          hashedPassword,
          data.temp_su_fname,
          data.temp_su_lname,
          data.temp_su_dob,
          data.temp_su_age,
          currentTimestamp,
          domain_url || "system",
          currentTimestamp,
          domain_url || "system",
          "active",
          "active",
          currentTimestamp,
          history,
          newCustomerId,
          1,
        ]
      );

      if (result.rows.length > 0) {
        return {
          success: true,
          message: "Signup successful",
        };
      } else {
        return {
          success: false,
          message: "Signup failed",
        };
      }
    } catch (error) {
      // Log the error for debugging
      Logger.error("Error in userSignUp:", error);
      return {
        success: false,
        message: "Database error",
      };
    }
  }
}
