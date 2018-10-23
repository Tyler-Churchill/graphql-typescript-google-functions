module.exports = {
  name: "default",
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "main",
  synchronize: true,
  logging: true,
  entities: ["src/**/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration"
  },
  name: console.log('wehat')
}