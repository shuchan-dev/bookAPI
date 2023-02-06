const Hapi = require("@hapi/hapi");
// Mengunakan route configuration pada server
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  // Menjalankan fungsi routes dari routes.js
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
