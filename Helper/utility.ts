import { Response } from "express";

export function notfound(res: Response) {
  res.status(404).send("404 Not Found");
}

export function validationFailed(res: Response) {
  res.status(406).send("406 Data not accepted");
}
