const appConfig = require("./config/app");
const DBConfig = require("./config/database");
const logger = require("./logger");
const fastify = require("fastify");
const mysql = require("@fastify/mysql");
const fastifycors = require("@fastify/cors");
const { teamManager } = require("./routes/team-controller");
const app = fastify({ logger: logger[appConfig.appMode] });
const port = appConfig.appPort;

app.register(mysql, {
  host: DBConfig.connection.host,
  port: DBConfig.port,
  user: DBConfig.connection.user,
  password: DBConfig.connection.password,
  database: "members",
  promise: true,
});

app.register(fastifycors);
app.register(teamManager, { prefix: "/team" });

try {
  app.listen({ port });
} catch (error) {
  if (error) {
    app.log.error(error.message);
    process.exit(1);
  }
}
