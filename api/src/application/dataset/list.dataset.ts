import { autoInjectable } from "tsyringe";
import { Event, EventHandler } from "../../infrastructure/mediator";
import { DatasetRepository } from "../../infrastructure/repository";

export class ListDatasetEvent extends Event {
  public getEventType() {
    return "dataset.list";
  }
}

@autoInjectable()
export class ListDatasetEventHandler implements EventHandler {
  constructor(private datasetRepository: DatasetRepository) {}

  public async handle(
    event: ListDatasetEvent
  ): Promise<{ text: string; datasets: any }> {
    const datasets = await this.datasetRepository.list();

    return { text: "Hello world!", datasets };
  }
}
