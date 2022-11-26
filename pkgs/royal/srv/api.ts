import { Request, Response } from "express";

export type APIContext = {
  req: Request<{}, any, any, Record<string, any>>;
  res: Response<Record<string, any> | string>;
  skip: () => void;
};
 