import * as dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
  port: Number(process.env.PORT),
  db_url: String(process.env.DB_URL),
  mail: {
    pass: String(process.env.MAIL_PASS),
    user: String(process.env.MAIL_USER),
    host: String(process.env.MAIL_HOST),
    port: Number(process.env.MAIL_PORT),
  },
  aToken: {
    key: String(process.env.ACCESS_TOKEN_KEY),
    time: String(process.env.ACCESS_TOKEN_TIME),
  },
  rToken: {
    key: String(process.env.REFRESH_TOKEN_KEY),
    time: String(process.env.REFRESH_TOKEN_TIME),
  },
};
