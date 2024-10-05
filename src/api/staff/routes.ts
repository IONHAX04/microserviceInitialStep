import * as Hapi from "@hapi/hapi";
import IRoute from "../../helper/route";
import validate from "./validate";
import StaffController from "./controller";

export default class StaffRoutes implements IRoute {
  public async register(server: any): Promise<any> {
    return new Promise((resolve) => {
      const controller = new StaffController();
      server.route([
        {
          method: "POST",
          path: "/api/v1/staff/login",
          config: {
            handler: controller.staffLogin,
            validate: validate.staffLogin,
            description: "Staff Login Checking", // Corrected here
            tags: ["api", "Staff", "Login"],
            auth: false,
          },
        },
        {
          method: "GET",
          path: "/api/v1/staff/registration/userData",
          config: {
            handler: controller.getUserData,
            // validate: validate.getUserData,
            description: "User Data for approve and reject",
            tags: ["api", "Staff", "approve", "reject"],
            auth: false,
          },
        },
      ]);
      resolve(true);
    });
  }
}
