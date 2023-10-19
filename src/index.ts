import {SiweMessage} from 'siwe';
import dotenv from "dotenv";
import {startServer, startDb} from "./app";
import {IncomingMessage, ServerResponse} from "http";
import mongoose from "mongoose";
import * as http from "http";
import {getEnvOrDefault, getEnvOrThrow} from "./utils/env";

const domain = "localhost";
const origin = "https://localhost/login";

function createSiweMessage(address: string, statement: string) {
  const siweMessage = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId: 1
  });
  return siweMessage.prepareMessage();
}

console.log(createSiweMessage(
  "0x6Ee9894c677EFa1c56392e5E7533DE76004C8D94",
  "This is a test statement."
));


async function main() {
  dotenv.config();

  const connectionString = getEnvOrThrow('MONGODB_URI');
  const port = getEnvOrDefault('PORT', 3000);

  await startDb(connectionString);
  const server = await startServer(port);


  const handler = getShutdownHandler(server);
  process.on('SIGTERM', handler)
  process.on('SIGINT', handler)
  process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err)
    handler()
  })
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
    handler()
  })
}

(async () => {
  await main()
})()

const getShutdownHandler = (server: http.Server<typeof IncomingMessage, typeof ServerResponse>) => {
  return async () => {
    console.log('\nGracefully shutting down...');

    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 1000 * 10);

    const closeServer = () => {
      return new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) {
            console.error(`Error closing server: ${err}`)
            reject(err);
          }
          else {
            console.log('Server closed');
            resolve();
          }
        });
      });
    }

    await closeServer();
    await mongoose.connection.close(false);
    console.log('MongoDB connection closed');
    process.exit(0); // Exit the process
  }
};
