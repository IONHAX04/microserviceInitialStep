import Hapi from "@hapi/hapi";
import UserRouters from "./api/users/routes";
import { Server } from "@hapi/hapi";

const init = async (): Promise<void> => {
  const server: Server = Hapi.server({
    port: 6200,
    host: "localhost",
  });

  console.log(`Server configuration set: port ${server.settings.port}`);

  const userRouters = new UserRouters();
  await userRouters.register(server);

  try {
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err: Error) => {
  console.log("Unhandled Rejection:", err);
  process.exit(1);
});

init();
