import express, { Application as ExpressApp, Router } from "express";
import { Db } from "mongodb";
import { container } from "tsyringe";
import { json as bodyParserJson } from "body-parser";
import {
  QueryConnectionEvent,
  QueryConnectionEventHandler,
} from "../application/connection/query.connection";
import {
  StartConnectionEvent,
  StartConnectionEventHandler,
} from "../application/connection/start.connection";
import {
  ListDatasetEvent,
  ListDatasetEventHandler,
} from "../application/dataset/list.dataset";
import { Mediator } from "./mediator";
import { getDatabase, initMongoConnection } from "./mongodb";
import {
  CheckConnectionEvent,
  CheckConnectionEventHandler,
} from "../application/connection/check.connection";
import {
  ListConnectionEvent,
  ListConnectionEventHandler,
} from "../application/connection/list.connection";

export class Application {
  private app: ExpressApp;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  public async init(router: Router) {
    await this.initDatabase();
    this.initMediator();
    this.initExpress(router);

    process.on("SIGINT", () => {
      // TODO close mongodb connection
    });
  }

  private async initDatabase() {
    const uri = "mongodb://mongodb:27017/nova"; // TODO env
    await initMongoConnection(uri);

    const databaseName = "nova"; // TODO env
    const connection = getDatabase(databaseName);

    container.register(Db, { useValue: connection });
  }

  private initExpress(router: Router) {
    this.app.use(bodyParserJson());
    this.app.use("/api/v1", router);
  }

  private initMediator() {
    const mediator = new Mediator();

    mediator.register(ListDatasetEvent, ListDatasetEventHandler);
    mediator.register(StartConnectionEvent, StartConnectionEventHandler);
    mediator.register(QueryConnectionEvent, QueryConnectionEventHandler);
    mediator.register(CheckConnectionEvent, CheckConnectionEventHandler);
    mediator.register(ListConnectionEvent, ListConnectionEventHandler);

    container.register(Mediator, { useValue: mediator });
  }

  public start() {
    this.app.listen(this.port, () =>
      console.log(`😎 Server is listening on port ${this.port}!`)
    );
  }
}
