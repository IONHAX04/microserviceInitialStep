import * as Hapi from "@hapi/hapi";

import IRoute from "../../helper/route";
import validate from "./validate";
import ProfileController from "./controller";
import { Logger } from "winston";

export default class ProfileRoutes implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise((resolve) => {
      const controller = new ProfileController();
      server.route([
        {
          method: "POST",
          path: "/api/v1/profile/create",
          config: {
            handler: controller.createProfile,
            validate: validate.createProfile,
            description: "Profile Creation",
            tags: ["api", "profile", "create"],
            auth: false,
          },
        },
      ]);

      resolve(true);
    });
  }
}
