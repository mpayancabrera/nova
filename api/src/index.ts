import "reflect-metadata";
import { router } from "./entrypoint/routes";
import { Application } from "./infrastructure/application";

const port = 8888; // TODO env
const app = new Application(port);

async function main() {
  await app.init(router);
  app.start();
}

main();
