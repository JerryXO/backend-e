export type ValueOf<T> = T[keyof T];

export const ENV = {
  development: 'development'
} as const;

export type ENVType = ValueOf<typeof ENV>;

export interface EnvConfigInterface {
  ENV: ENVType;
  PORT: number;
}

export interface ObjectGeneric {
  [key: string]: any;
}

export interface ResponseData extends ObjectGeneric {
  meta?: ObjectGeneric;
  result?: ObjectGeneric;
}

export interface ResponseBody {
  error: boolean;
  status?: string;
  statusCode: number;
  message?: string;
  data?: ResponseData;
  type?: string;
}

export interface ComposeBodyAttrs {
  statusCode?: number;
  status?: string;
  message?: string;
  data?: ResponseData;
}

export type ComposeBodyFn = (attrs: ComposeBodyAttrs) => ResponseBody;

export interface Config {
  envConfigs: ObjectGeneric;
  appConfigs: ObjectGeneric;
}