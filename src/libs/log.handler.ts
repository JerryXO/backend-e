import { HandyLogger, HandyLoggerBase, LogLevels } from 'handy-logger';
const handyLogger: HandyLogger = new HandyLogger({
  title: 'Backend-E',
  level: LogLevels.Silly,
});

export const logger: HandyLoggerBase = handyLogger.getLogger();
