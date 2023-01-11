module.exports = {
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ["./dist/modules/**/infra/typeorm/entities/*.js"],
  migrations: ["./dist/shared/infra/typeorm/migrations/*.js"],
  cli: {
    migrationsDir: "./dist/shared/infra/typeorm/migrations"
  },
}
