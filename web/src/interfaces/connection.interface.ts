interface IConnectionBase {
  host: string;
  port: number;
  user: string;
  database: string;
}

export interface IConnection extends IConnectionBase {
  id: string;
  status: boolean;
}

export interface ICredentials extends IConnectionBase {
  password: string;
}
