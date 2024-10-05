import * as Hapi from "@hapi/hapi";

import IRoute from "../../helper/route";
import validate from "./validate";
import UserController from "./controller";
import { Logger } from "winston";

export default class UserRouters implements IRoute {
  public async register(server: any): Promise<any> {
    return new Promise((resolve) => {
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
        {
          method: "POST",
          path: "/api/v1/users/signup",
          config: {
            handler: controller.userSignUp,
            validate: validate.userSignUp,
            description: "Signup Checking",
            tags: ["api", "Users", "SignUp"],
            auth: false,
          },
        },
      ]);
      resolve(true);
    });
  }
}
