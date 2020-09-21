import { Event, EventConstructor } from "./event";
import { EventHandlerConstructor } from "./event-handler";

export class Mediator {
  private handlers: { [key: string]: EventHandlerConstructor } = {};

  public register<
    T extends EventConstructor,
    K extends EventHandlerConstructor
  >(event: T, handler: K) {
    const instance = new event();
    const eventType = instance.getEventType();
    console.log(`[INFO] Mediator: register event ${eventType}`);
    this.handlers[eventType] = handler;
  }

  public async publish<T extends Event>(event: T) {
    console.log(`[INFO] Mediator: handle event ${event.getEventType()}`);
    const handler = new this.handlers[event.getEventType()]();
    return handler.handle(event);
  }
}
