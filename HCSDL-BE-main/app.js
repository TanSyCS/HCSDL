const express = require("express");
const expressApp = require("./init");
const adminRouter = require("./route");
const pool = require("./database");
const cors = require("cors");
const {
  login,
  create_film,
  film_update,
  create_film_company,
  update_film_company,
  create_film_director,
  update_film_director,
  create_film_actor,
  update_film_actor,
  get_film,
  get_actor,
  get_director,
  get_film_field,
  get_film_order,
  delete_film,
  get_film_duration,
  film_revenue,
  delete_actor,
  delete_director,
} = require("./controller");
const StartServer = async () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
  app.use("/admin", adminRouter);

  // route(app);
  // await expressApp(app);
  app.listen(3001);
};
StartServer();
