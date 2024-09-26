import dbConnection from "../../helper/db";
import { default as Logger } from "../.././helper/logger";

export default class ProfileRepository {
  public async profileSetup(
    data: { email: string; password: string },
    domain_url?: string
  ): Promise<{ success: boolean; message: string }> {
    return new Promise(async (resolve, reject) => {
      Logger.info("User login API triggered --- ");
      try {
      } catch {}
    });
  }
}
