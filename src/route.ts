import * as Hapi from "@hapi/hapi";
import Logger from "./helper/logger";
import logger from "./helper/logger";
import UserRouters from "./api/users/routes";

export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<any> {
    await new UserRouters().register(server);
  }
}
