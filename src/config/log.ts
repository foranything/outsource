import { Config } from './index';

export namespace Log {
  export const enum Level {
    DEBUG,
    INFO,
    WARN,
    ERROR
  }

  export const printError = (...message: any[]): void => {
    if (Config.level <= Level.ERROR) console.error(...message);
  };

  export const printWarn = (...message: any[]): void => {
    if (Config.level <= Level.WARN) console.warn(...message);
  };

  export const printInfo = (...message: any[]): void => {
    if (Config.level <= Level.INFO) console.info(...message);
  };

  export const printDebug = (...message: any[]): void => {
    if (Config.level <= Level.DEBUG) console.debug(...message);
  };
}
