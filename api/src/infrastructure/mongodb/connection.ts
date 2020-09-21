import { MongoClient } from "mongodb";

let client: MongoClient;

export const initMongoConnection = async (uri: string) => {
  client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
};

export const getDatabase = (databaseName: string) => {
  return client.db(databaseName);
};

export const closeMongoConnection = async () => {
  await client.close();
};
