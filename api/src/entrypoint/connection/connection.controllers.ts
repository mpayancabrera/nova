import { Request, Response } from "express";
import { container } from "tsyringe";
import { CheckConnectionEvent } from "../../application/connection/check.connection";
import { ListConnectionEvent } from "../../application/connection/list.connection";
import { QueryConnectionEvent } from "../../application/connection/query.connection";
import { StartConnectionEvent } from "../../application/connection/start.connection";
import { Mediator } from "../../infrastructure/mediator";

export const startConnection = async (req: Request, res: Response) => {
  const data = {
    // TODO validation
    host: req.body.host as string,
    port: req.body.port as number,
    user: req.body.user as string,
    password: req.body.password as string,
    database: req.body.database as string,
  };

  const event = new StartConnectionEvent(
    data.host,
    data.port,
    data.user,
    data.password,
    data.database
  );
  const mediator = container.resolve(Mediator); // TODO set Mediator type

  try {
    const resData = await mediator.publish(event); // TODO set EventHandler return type
    res.status(200).send(resData);
  } catch (e) {
    res.status(502).send({ error: e.message });
  }
};

export const queryConnection = async (req: Request, res: Response) => {
  const data = {
    // TODO validation
    connection: req.body.connection as string,
    query: req.body.query as string,
  };

  const event = new QueryConnectionEvent(data.connection, data.query);

  const mediator = container.resolve(Mediator); // TODO set Mediator type

  try {
    const resData = await mediator.publish(event); // TODO set EventHandler return type
    res.status(200).send(resData);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

export const checkConnection = async (req: Request, res: Response) => {
  const connectionId = req.params.id as string; // TODO validation

  const event = new CheckConnectionEvent(connectionId);
  const mediator = container.resolve(Mediator); // TODO set Mediator type

  const resData = await mediator.publish(event); // TODO set EventHandler return type
  res.status(200).send(resData);
};

export const listConnection = async (req: Request, res: Response) => {
  const event = new ListConnectionEvent();
  const mediator = container.resolve(Mediator); // TODO set Mediator type
  const resData = await mediator.publish(event); // TODO set EventHandler return type
  res.status(200).send(resData);
};
