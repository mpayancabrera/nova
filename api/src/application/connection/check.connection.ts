import { autoInjectable } from "tsyringe";
import { Event, EventHandler } from "../../infrastructure/mediator";
import { connections } from "./connections";

export class CheckConnectionEvent extends Event {
  constructor(private connectionId: string) {
    super();
  }

  public getEventType() {
    return "connection.check";
  }

  public getConnectionId() {
    return this.connectionId;
  }
}

@autoInjectable()
export class CheckConnectionEventHandler implements EventHandler {
  constructor() {}

  public async handle(
    event: CheckConnectionEvent
  ): Promise<{ status: boolean }> {
    const connectionId = event.getConnectionId();

    return { status: connectionId in connections };
  }
}
