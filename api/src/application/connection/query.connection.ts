import { autoInjectable } from "tsyringe";
import { Event, EventHandler } from "../../infrastructure/mediator";
import { connections } from "./connections";

export class QueryConnectionEvent extends Event {
  constructor(private connectionId: string, private query: string) {
    super();
  }

  public getEventType() {
    return "connection.query";
  }

  public getQuery() {
    return this.query;
  }

  public getConnectionId() {
    return this.connectionId;
  }
}

@autoInjectable()
export class QueryConnectionEventHandler implements EventHandler {
  constructor() {}

  public async handle(event: QueryConnectionEvent): Promise<{ data: any[] }> {
    const connectionId = event.getConnectionId();
    // TODO Check connection in dict
    const { client } = connections[connectionId];
    let data = [];

    try {
      const { rows } = await client.query(event.getQuery());
      data = rows;
    } catch (e) {
      console.log(e);
      throw new Error("Cannot query DB.");
    }

    return { data };
  }
}
