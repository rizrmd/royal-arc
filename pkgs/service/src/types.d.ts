export type SERVICE_NAME = string;
export type SERVICE_TYPE = "service" | "web" | "db" | "srv";
export type MODE = "dev" | "prod" | "staging";

export type InitServiceResult = Record<string, any> & { name: SERVICE_NAME };
