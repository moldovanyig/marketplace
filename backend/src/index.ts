import logger from './logger';
import app from './app';
import config from './config';

const PORT = config.port || 3000;

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});
