// TODO Improve connection management logic
export interface IConnection {
  id: string;
  host: string;
  port: number;
  user: string;
  database: string;
  client: any;
}

export const connections: {
  [key: string]: IConnection;
} = {};
