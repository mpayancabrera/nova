import { Event } from "./event";

export interface EventHandlerResponse {}

export interface EventHandler {
  handle(event: Event): Promise<EventHandlerResponse>;
}

export interface EventHandlerConstructor {
  new (...args: any[]): EventHandler;
}
