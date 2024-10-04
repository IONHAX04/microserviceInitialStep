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
    console.log("Controller page ----");
    try {
      console.log(`GET URL REQ => ${request.url.href}`);
      const req = request.headers.origin || "";

      // https://ublisyoga.com/student
      const index = req.indexOf("://");
      console.log("Separate url : ", index);
      const entity = await this.resolver.userLogin(request.payload);
      return response.response(entity);
    } catch (error) {
      console.log("error -> ", error);
      if (error instanceof Error) {
        return response.response(Boom.badImplementation(error.message));
      } else {
        return response.response(
          Boom.badImplementation("An unknown error occurred")
        );
      }
    }
  };

  public userSignUp = async (
    request: Hapi.Request,
    response: Hapi.ResponseToolkit
  ): Promise<any> => {
    logger.info("Router - sign up page");
    try {
      const req = request.headers.origin || "";
      const index = req.indexOf("://");
      console.log("Separate url : ", index);
      const entity = await this.resolver.userSignUp(request.payload);
      console.log("entity", entity);
      return response.response(entity);
    } catch (error) {
      console.log("error -> ", error);
      if (error instanceof Error) {
        return response.response(Boom.badImplementation(error.message));
      } else {
        return response.response(
          Boom.badImplementation("An unknown error occurred")
        );
      }
    }
  };
}
