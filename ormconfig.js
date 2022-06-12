module.exports = {
  type: "postgres",
  host: process.env.TYPEORM_TYPE,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  migrations: ["./src/shared/typeorm/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/shared/typeorm/migrations"
  },
}