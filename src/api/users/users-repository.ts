import dbConnection from "../../helper/db";
import { default as Logger } from "../.././helper/logger";
import bcrypt from "bcryptjs";

export default class UserRepository {
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
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      dob: string;
      mobile: string;
    },
    domain_url?: string
  ): Promise<{ success: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        // SALT
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        const currentTimestamp = new Date().toISOString();

        const result = await dbConnection.query(
          `INSERT INTO student_temp_signup (
            temp_su_fname, 
            temp_su_Iname, 
            temp_su_dob, 
            temp_su_mobile, 
            temp_su_email, 
            temp_su_password, 
            temp_su_hashed_password, 
            temp_su_status, 
            temp_su_created_at, 
            temp_su_created_by
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
          [
            data.firstName,
            data.lastName,
            data.dob,
            data.mobile,
            data.email,
            data.password,
            hashedPassword,
            "active",
            currentTimestamp,
            domain_url || "system",
          ]
        );

        if (result.rows.length > 0) {
          resolve({
            success: true,
            message: "Signup successful",
          });
        } else {
          resolve({
            success: false,
            message: "Signup failed",
          });
        }
      } catch (error) {
        Logger.error("Error in userSignUp:", error);
        reject({
          success: false,
          message: "Database error",
        });
      }
    });
  }
}
