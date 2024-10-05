import * as Hapi from "@hapi/hapi";
import * as Boom from "@hapi/boom";
import Resolver from "./resolver";
import logger from "../../helper/logger";

export default class UserController {
  public resolver: any;

  constructor() {
    this.resolver = new Resolver();
  }

  public userLogin = async (
    request: Hapi.Request,
    response: Hapi.ResponseToolkit
  ): Promise<any> => {
    logger.info("Router----- line 17");
    try {
      logger.info(`GET URL REQ => ${request.url.href}`);
      const domainCode = request.headers.domain_code || "";
      let entity;

      // if (domainCode.includes("ubl")) {
      entity = await this.resolver.userLoginV1(request.payload);
      // } else {
      //   entity = await this.resolver.userLoginV2(request.payload);
      // }

      // Check entity response for success/failure
      if (entity.success) {
        return response.response(entity).code(200);
      }
      return response.response(entity).code(401); // Unauthorized if failed
    } catch (error) {
      logger.error("Error in userLogin:", error);
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

  public userSignUp = async (
    request: Hapi.Request,
    response: Hapi.ResponseToolkit
  ): Promise<any> => {
    console.log("testing");
    logger.info("Router - sign up page");
    try {
      const domainCode = request.headers.domain_code || "";

      if (domainCode.includes("ubl")) {
      const entity = await this.resolver.userSignUpV1(request.payload);
      } else {
        const entity = await this.resolver.userSignUpV2(request.payload);
      }

      // Check entity response for success/failure
      if (entity.success) {
        return response.response(entity).code(201); // Created
      }
      return response.response(entity).code(400); // Bad Request if failed
    } catch (error) {
      logger.error("Error in userSignUp:", error);
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
