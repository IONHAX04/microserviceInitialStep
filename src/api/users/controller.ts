import * as Hapi from "@hapi/hapi";
import * as Boom from "@hapi/boom";
import Resolver from "./resolver";

export default class UserController {
  public resolver: any;

  constructor() {
    this.resolver = new Resolver();
  }

  public userLogin = async (
    request: Hapi.Request,
    response: Hapi.ResponseToolkit
  ): Promise<any> => {
    console.log("Controller page ----");
    try {
      console.log(`GET URL REQ => ${request.url.href}`);
      const req = request.headers.origin || "";
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
}
