const fastify = require("fastify")({ logger: true });
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3001, "127.0.0.1");
    fastify.swagger();
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

fastify.decorate("db", db);

fastify.register(require("fastify-cors"));
fastify.register(require("fastify-swagger"), {
  swagger: {
    info: {
      title: "ConfR Server 2019 API",
      version: "0.1.0",
    },
    host: "mock--api.herokuapp.com",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
  exposeRoute: true,
  routePrefix: "/",
});

fastify.register(require("./routes/login"));
fastify.register(require("./routes/rooms"));

start();
