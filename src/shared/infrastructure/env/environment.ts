import ProcessEnv = NodeJS.ProcessEnv;
import * as dotenv from 'dotenv';

const env: ProcessEnv = process.env;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
dotenv.config();

export interface EnvironmentInterface {
  databaseUrl: string;
  port: number;
}

export const environment: EnvironmentInterface = {
  databaseUrl: env.DATABASE_URL as string,
  port: env.SERVICE_PORT ? parseInt(env.SERVICE_PORT, 10) : 3000,
};
