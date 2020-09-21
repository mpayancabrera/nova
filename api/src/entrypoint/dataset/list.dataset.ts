import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListDatasetEvent } from "../../application/dataset/list.dataset";
import { Mediator } from "../../infrastructure/mediator";

export const listDataset = async (req: Request, res: Response) => {
  const event = new ListDatasetEvent();
  const mediator = container.resolve(Mediator); // TODO set Mediator type
  const data = await mediator.publish(event); // TODO set EventHandler return type
  res.status(200).send(data);
};
