import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

export default {
  type: 'postgres',
  host: process.env.TYPEORM_HOST as string,
  port: parseInt(process.env.TYPEORM_PORT as string, 10) as number,
  username: process.env.TYPEORM_USERNAME as string,
  password: process.env.TYPEORM_PASSWORD as string,
  database: process.env.TYPEORM_DATABASE as string,
  synchronize: false,
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/**/migration/*.js'],
  migrationsRun: true,
} as DataSourceOptions;
