import { Collection, Db } from "mongodb";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class Repository {
  protected collectionName = "";
  protected collection?: Collection;
  protected connection: Db;

  constructor(connection?: Db) {
    this.connection = connection!; // TODO Maybe raise an exception if it's undefined?
  }

  protected setCollection(collectionName: string) {
    this.collectionName = collectionName;
    this.collection = this.connection.collection(this.collectionName);
  }
}
