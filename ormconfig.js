module.exports = {
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ["./src/modules/**/typeorm/entities/*.ts,*.js"],
  migrations: ["./src/shared/typeorm/migrations/*.ts,*js"],
  cli: {
    migrationsDir: "./src/shared/typeorm/migrations"
  },
}
