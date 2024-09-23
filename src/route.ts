import * as Hapi from "@hapi/hapi";
import Logger from "./helper/logger";
import logger from "./helper/logger";
import UserRouters from "./api/users/routes";

export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<any> {
    Logger.info("Router started");
    logger.info("server running --- line 9", process.env.PORT);
    await new UserRouters().register(server);
    Logger.info("Router finished...");
  }
}
