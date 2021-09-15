import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  url: process.env.REACT_APP_BASE_URL,
};

export default config;
