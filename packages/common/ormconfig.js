module.exports = {
  name: 'default',
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'test-db',
  synchronize: true,
  logging: true,
  entities: ['src/**/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration'
  }
};
