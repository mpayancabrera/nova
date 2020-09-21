import { ICredentials } from "../interfaces/connection.interface";

export class ConnectionService {
  public static async connect(credentials: ICredentials) {
    return fetch("/api/v1/connection", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });
  }

  public static async check(connectionId: string) {
    return fetch(`/api/v1/connection/${connectionId}`, {
      method: "GET",
    });
  }

  public static async list() {
    return fetch(`/api/v1/connection`, {
      method: "GET",
    });
  }
}
