import { autoInjectable } from "tsyringe";
import { Event, EventHandler } from "../../infrastructure/mediator";
import { connections } from "./connections";

export class ListConnectionEvent extends Event {
  public getEventType() {
    return "connection.list";
  }
}

@autoInjectable()
export class ListConnectionEventHandler implements EventHandler {
  constructor() {}

  public async handle(event: ListConnectionEvent): Promise<any> {
    const data = Object.values(connections).map((c) => ({
      id: c.id,
      host: c.host,
      user: c.user,
      database: c.database,
      port: c.port,
    }));

    return { connections: data };
  }
}
