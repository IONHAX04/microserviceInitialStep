import dbConnection from "../../helper/db";
import { default as Logger } from "../.././helper/logger";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export default class UserRepository {
  public async isUserModelReady(): Promise<boolean> {
    try {
      const result = await dbConnection.query("SELECT 1 FROM users LIMIT 1");
      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      Logger.error("Error checking users model:", error);
      return false;
    }
  }

  public async userLogin(
    data: { email: string; password: string },
    domain_url?: string
  ): Promise<{ success: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      Logger.info("User login API triggered --- ");
      try {
        // STAFF TABLE
        const staffResult = await dbConnection.query(
          "SELECT * FROM staff WHERE email = $1 AND password = $2",
          [data.email, data.password]
        );

        if (staffResult.rows.length > 0) {
          const validPassword = await bcrypt.compare(
            data.password,
            staffResult.rows[0].password
          );
          if (validPassword) {
            resolve({
              success: true,
              message: "Staff login successful",
            });
            return;
          }
        }

        // USERS TABLE

        const userResult = await dbConnection.query(
          "SELECT * FROM users WHERE email = $1",
          [data.email]
        );

        if (userResult.rows.length > 0) {
          const validPassword = await bcrypt.compare(
            data.password,
            userResult.rows[0].password
          );
          if (validPassword) {
            resolve({
              success: true,
              message: "User login successful",
            });
          } else {
            resolve({
              success: false,
              message: "Invalid email or password",
            });
          }
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

  public async userSignUp(
    data: {
      temp_su_email: string;
      temp_su_password: string;
      domain?: string;
      temp_su_fname: string;
      middleName?: string;
      temp_su_lname: string;
      temp_su_dob: string;
      temp_su_mobile: string;
    },
    domain_url?: string
  ): Promise<{ success: boolean; message: string }> {
    const isModelReady = await this.isUserModelReady();
    if (!isModelReady) {
      return {
        success: false,
        message: "User model is not ready",
      };
    }

    

    try {
      if (
        !data.temp_su_email ||
        !data.temp_su_password ||
        !data.temp_su_fname ||
        !data.temp_su_lname ||
        !data.temp_su_dob
      ) {
        return {
          success: false,
          message: "Missing required fields",
        };
      }

      // SALT
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        data.temp_su_password,
        saltRounds
      );
      const currentTimestamp = new Date().toISOString();

      // Generate UUIDs for refStId and refUtId
      const refStId = uuidv4(); // Unique identifier for refStId
      // const refUtId = uuidv4(); // Uncomment if you need a refUtId as well.

      // Insert query to the database
      const result = await dbConnection.query(
        `INSERT INTO ublisUsers (
          refStId,
          refStFName,
          refStLName,
          refStMName,
          refStDOB,
          refsCreationDate,
          refsCreatedBy,
          refsLastUpdated,
          refsUpdatedBy,
          refsUserStatus,
          refsIsActive,
          refSignupDate
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        [
          refStId,
          data.temp_su_fname,
          data.temp_su_lname,
          data.middleName || null,
          data.temp_su_dob,
          currentTimestamp,
          domain_url || "system",
          currentTimestamp,
          domain_url || "system",
          "active",
          true,
          currentTimestamp,
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
