import { injectable } from "tsyringe";
import { Repository } from "./repository";

@injectable()
export class DatasetRepository extends Repository {
  protected collectionName = "dataset";

  constructor() {
    super();
    this.setCollection(this.collectionName);
  }

  public async list() {
    return await this.collection!.find({}).toArray();
  }
}
