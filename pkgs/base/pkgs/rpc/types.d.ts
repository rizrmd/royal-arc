export type Primitive =
  | bigint
  | boolean
  | null
  | number
  | string
  | symbol
  | undefined
  | void
  | Date
  | ArrayBuffer
  | Buffer
  | Uint8Array;

export type Serializable =
  | Primitive
  | Record<string, Serializable>
  | Serializable[];

export type ActionItem = (
  ...arg: any[]
) => Promise<Serializable> | Serializable;

export type PromisedActionItemFn<T extends ActionItemFn> = (
  ...args: Parameters<T>
) => ReturnType<T> extends Promise<Primitive>
  ? ReturnType<T>
  : Promise<ReturnType<T>>;

export type ActionArg = Record<
  string,
  ActionItem | Record<string, ActionItem | Record<string, ActionItem>>
>;

export type ActionResult<
  T extends Record<
    string,
    ActionItem | Record<string, ActionItem | Record<string, ActionItem>>
  >
> = {
  [K in keyof T]: T[K] extends Record<
    string,
    ActionItem | Record<string, ActionItem>
  >
    ? ActionResult<T[K]>
    : T[K] extends ActionItemFn
    ? PromisedActionItemFn<T[K]>
    : Promise<T[K]>;
};

export type RPCConnection<T> = ActionResult<T> & {
  _ws: WebSocket<{ embed: Client }>;
};

export type RPCManager<T> = {
  current: {
    setData: (arg: Record<string, Serializable>) => Promise<void>;
  };
  clients: (
    each: (client: {
      pid: string;
      data: any;
      action: ActionResult<T>;
      disconnect: () => Promise<void>;
    }) => Promise<void>
  ) => Promise<void>;
};

export type ActionExecMsg =
  | {
      type: "msg";
      mid: string;
      method: string[];
      args: Primitive[];
    }
  | ActionExecManager;

export type ActionExecManager =
  | {
      type: "manage";
      mid: string;
      task: "list-clients";
    }
  | {
      type: "manage";
      mid: string;
      task: "set-data";
      data: Record<string, Serializable>;
    }
  | {
      type: "manage";
      mid: string;
      task: "call-action";
      pid: string;
      method: string[];
      args: Serializable[];
    }
  | {
      type: "manage";
      task: "result-action";
      mid: string;
      callerPid: string;
      result: Serializable;
    };

export type ActionResultMsg =
  | {
      type: "result";
      mid: string;
      error?: { message?: string; code?: string; stack?: string };
      result?: Serializable;
    }
  | {
      type: "client-call";
      callerPid: string;
      mid: string;
      method: string[];
      args: Serializable[];
    };

export type Client = {
  rpcName: string;
  host: string;
  pid: string;
  send: (result: ActionResultMsg) => void;
  data: any;
};
