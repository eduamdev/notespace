import { APP_LOG_PREFIX } from "./constants";

const log = (message: string): void => {
  console.log(`${APP_LOG_PREFIX} ${message}`);
};

const error = (message: string): void => {
  console.error(`${APP_LOG_PREFIX} ${message}`);
};

const warn = (message: string): void => {
  console.warn(`${APP_LOG_PREFIX} ${message}`);
};

export { log, error, warn };
