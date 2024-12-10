import { HandyLogger, HandyLoggerBase, LogLevels } from 'handy-logger';
const handyLogger: HandyLogger = new HandyLogger({
  title: 'My Awesome App',
  level: LogLevels.Silly,
});

export const logger: HandyLoggerBase = handyLogger.getLogger();
