import { SrvHttpRequest, SrvHttpResponse } from "./global-ex";

export type APIContext = {
  req: SrvHttpRequest;
  res: SrvHttpResponse;
  skip: () => void;
};

export const apiContext = (obj: any): APIContext => {
  return obj as APIContext;
};
