import * as Hapi from "@hapi/hapi";
import * as Boom from "@hapi/boom";
import Resolver from "./resolver";
import logger from "../../helper/logger";

export default class profileController {
  public resolver: any;
  constructor() {
    this.resolver = new Resolver();
  }
}
