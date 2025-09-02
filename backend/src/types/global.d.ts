// Global type declarations for Node.js environment
declare global {
  var process: NodeJS.Process;
  var console: Console;
  var Buffer: typeof Buffer;
  var __dirname: string;
  var __filename: string;
  var global: typeof globalThis;
  var module: NodeModule;
  var require: NodeRequire;
  var exports: any;
}

// Module declarations for packages without type definitions
declare module 'express' {
  import { Request, Response, NextFunction } from 'express';
  export = express;
  export as namespace express;
  namespace express {
    interface Request extends Request {}
    interface Response extends Response {}
    interface NextFunction extends NextFunction {}
  }
  function express(): express.Application;
  namespace express {
    interface Application {}
  }
}

declare module 'cors' {
  function cors(options?: any): any;
  export = cors;
}

declare module 'helmet' {
  function helmet(options?: any): any;
  export = helmet;
}

declare module 'morgan' {
  function morgan(format?: string): any;
  export = morgan;
}

declare module 'mongoose' {
  export function connect(uri: string, options?: any): Promise<any>;
  export function disconnect(): Promise<void>;
  export class Schema {
    constructor(definition: any, options?: any);
  }
  export class Model<T> {
    constructor(name: string, schema: Schema);
    static create(doc: any): Promise<T>;
    static find(query?: any): Promise<T[]>;
    static findById(id: string): Promise<T | null>;
    static findByIdAndUpdate(id: string, update: any, options?: any): Promise<T | null>;
    static findByIdAndDelete(id: string): Promise<T | null>;
  }
  export function model<T>(name: string, schema: Schema): Model<T>;
}

declare module 'dotenv' {
  export function config(): void;
}

declare module 'express-rate-limit' {
  function rateLimit(options: any): any;
  export = rateLimit;
}

export {};
