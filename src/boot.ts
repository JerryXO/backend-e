import { app } from './app';
import { envConfigs } from './configs';
import { logger } from './libs';

app.disable('etag');

app.listen(envConfigs.PORT, (): void => {
  logger.info(`Server started on port ${envConfigs.PORT}`);
});