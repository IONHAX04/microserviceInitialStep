import * as Hapi from "@hapi/hapi";

import IRoute from "../../helper/route";
import validate from "./validate";
import UserController from "./controller";

export default class UserRouters implements IRoute {
  public async register(server: any): Promise<any> {
    return new Promise((resolve) => {
      console.log("Router page -----");
      const controller = new UserController();
      server.route([
        {
          method: "POST",
          path: "/api/v1/users/login",
          config: {
            handler: controller.userLogin,
            validate: validate.userLogin,
            description: "Login Checking",
            tags: ["api", "Users"],
            auth: false,
          },
        },
      ]);
    });
  }
}
