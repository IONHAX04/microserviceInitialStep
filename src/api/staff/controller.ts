import * as Hapi from "@hapi/hapi";
import * as Boom from "@hapi/boom";
import Resolver from "./resolver";
import logger from "../../helper/logger";

export default class StaffController {
  public resolver: any;

  constructor() {
    this.resolver = new Resolver();
  }

  public staffLogin = async (
    request: Hapi.Request,
    response: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      const domainCode = request.headers.domain_code || "";
      const entity = await this.resolver.staffLoginV1(request.payload);
      if (entity.success) {
        return response.response(entity).code(200);
      }
      return response.response(entity).code(401);
    } catch (error) {
      logger.error("Error in staff Login:", error);
      return response
        .response({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        })
        .code(500);
    }
  };

  public getUserData = async (
    request: Hapi.Request,
    response: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      const entity = await this.resolver.getUserDataV1(request.payload);
      console.log("entity", entity);
      if (entity.success) {
        return response.response(entity).code(200);
      }
      return response.response(entity).code(401);
    } catch (error) {
      logger.error("Error in fetching user data:", error);
      return response
        .response({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        })
        .code(500);
    }
  };
}
