import { autoInjectable } from "tsyringe";
import { v4 } from "uuid";
import { Client } from "pg";
import { Event, EventHandler } from "../../infrastructure/mediator";
import { connections } from "./connections";

export class StartConnectionEvent extends Event {
  constructor(
    private host: string,
    private port: number,
    private user: string,
    private password: string,
    private database: string
  ) {
    super();
  }

  public getEventType() {
    return "connection.start";
  }

  public getHost() {
    return this.host;
  }

  public getPort() {
    return this.port;
  }

  public getUser() {
    return this.user;
  }

  public getPassword() {
    return this.password;
  }

  public getDatabase() {
    return this.database;
  }
}

@autoInjectable()
export class StartConnectionEventHandler implements EventHandler {
  constructor() {}

  public async handle(
    event: StartConnectionEvent
  ): Promise<{ connectionId: string }> {
    const connectionId = v4();
    const client = new Client({
      user: event.getUser(),
      host: event.getHost(),
      database: event.getDatabase(),
      password: event.getPassword(),
      port: event.getPort(),
    });

    try {
      await client.connect();
      connections[connectionId] = {
        id: connectionId,
        user: event.getUser(),
        host: event.getHost(),
        database: event.getDatabase(),
        port: event.getPort(),
        client,
      };
    } catch (e) {
      // TODO Create custom error and handling system
      throw new Error("Cannot connect to database");
    }

    return { connectionId };
  }
}
