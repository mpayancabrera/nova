export abstract class Event {
  public abstract getEventType(): string;
}

export interface EventConstructor {
  new (...args: any[]): Event;
}
