import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import * as path from 'path'
dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [path.resolve(__dirname, 'entities', '*.entity{.ts,.js}')],
  synchronize: false,
  logging: false,
  migrations: ['src/migrations/**{.js,.ts}'],
  migrationsTableName: 'migrations',
})
