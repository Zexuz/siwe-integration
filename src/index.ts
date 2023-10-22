import { startServer } from "./app";
import { IncomingMessage, ServerResponse } from "http";
import mongoose from "mongoose";
import * as http from "http";
import { startDb } from "./config/db";
import { PORT } from "./config/env";

async function main() {
  console.log("Starting server...");
  await startDb();
  const server = await startServer(PORT);

  const handler = getShutdownHandler(server);
  process.on("SIGTERM", handler);
  process.on("SIGINT", handler);
  process.on("uncaughtException", (err) => {
    console.error("There was an uncaught error", err);
    handler();
  });
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    handler();
  });
}

(async () => {
  await main();
})();

/*
 * Used to gracefully shutdown the server when updating or restarting the docker container
 * */
const getShutdownHandler = (
  server: http.Server<typeof IncomingMessage, typeof ServerResponse>,
) => {
  return async () => {
    console.log("Gracefully shutting down...");

    // Forcefully shutdown after 10 seconds in case something goes wrong
    setTimeout(() => {
      console.error(
        "Could not close connections in time, forcefully shutting down",
      );
      process.exit(1);
    }, 1000 * 10);

    const closeServer = () => {
      return new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) {
            console.error(`Error closing server: ${err}`);
            reject(err);
          } else {
            console.log("Server closed");
            resolve();
          }
        });
      });
    };

    await closeServer();
    await mongoose.connection.close(false);
    console.log("MongoDB connection closed");
    process.exit(0); // Exit the process
  };
};
