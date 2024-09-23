"use strict";

const Hapi = require("@hapi/hapi");
import logger from "./helper/logger";
import Router from "./route";

import * as DotEnv from "dotenv";

const init = async () => {
  try {
    DotEnv.config();
    // console.log("Running on port  ->  ", process.env:NODE_ENV);

    const server = Hapi.server({
      host: process.env.HOST,
      port: process.env.PORT,
      routes: {
        security: true,
        cors: true,
        payload: {
          maxBytes: 5242880,
        },
      },
    });

    // REGISTER HAPI ROUTES
    await Router.loadRoutes(server);

    await server.start((error: any) => {
      if (error) {
        logger.error(error);
        throw error;
      }
    });

    logger.info("server running --- from server.ts", process.env.PORT);
  } catch (error) {
    logger.error("Server not running...", error);
  }
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
