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
} = require("../controller");
module.exports = (app) => {
  //login
  app.post("/login", async (req, res, next) => {
    const data = req.body;
    login(data, (err, results) => {
      if (err) {
        next(err);
      }
      if (results) return res.json({ message: "success" });
      else return res.json({ message: "invalid email or password" });
    });
  });
  // get all film infor

  // get actor infor
  app.get("/actor", (req, res, next) => {
    const data = req.body;
    get_actor(data, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      return res.json({ data: results });
    });
  });
  //get director infor
  app.get("/director", (req, res, next) => {
    const data = req.body;
    get_director(data, (err, results) => {
      if (err) {
        next(err);
      }
      return res.json({ data: results });
    });
  });
  //create new film
  app.post("/film/create", (req, res, next) => {
    const data = req.body;
    create_film(data, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      if (results) return res.json({ message: "create success" });
      else return res.json({ message: "create failed" });
    });
  });
  // update film
  app.post("/film/update", (req, res, next) => {
    const data = req.body;
    film_update(data, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      return res.json({ message: "success" });
    });
  });
  // create production company
  app.post("/film/create/company", (req, res, next) => {
    const data = req.body;
    create_film_company(data, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      if (results) return res.json({ message: "create success" });
      return res.json({ message: "create failed" });
    });
  });
  // update production company
  app.post("/film/update/company", (req, res, next) => {
    const data = req.body;
    update_film_company(data, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      return res.json({ message: "success" });
    });
  });
  //create director
  app.post("/film/create/director", (req, res, next) => {
    const data = req.body;
    create_film_director(data, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      if (results) return res.json({ message: "create success" });
      return res.json({ message: "create failed" });
    });
  });
  //update director
  app.post("/film/update/director", (req, res, next) => {
    const data = req.body;
    update_film_director(data, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      return res.json({ message: "success" });
    });
  });
  //create actor
  app.post("/film/create/actor", (req, res, next) => {
    const data = req.body;
    create_film_actor(data, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      if (results) return res.json({ message: "create success" });
      return res.json({ message: "create failed" });
    });
  });
  //update actor
  app.post("/film/update/actor", (req, res, next) => {
    const data = req.body;
    update_film_actor(data, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      return res.json({ message: "sucess" });
    });
  });
  //get film with input
  app.get("/film/input", (req, res, next) => {
    const data = req.body;
    get_film_field(data.input, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      return res.json({ data: results });
    });
  });
  app.get("/film/duration", (req, res, next) => {
    const data = req.body;
    get_film_duration(data, (err, results) => {
      if (err) {
        next(err);
      }
      return res.json({ data: results });
    });
  });
  //delete film
  app.delete("/film/delete", (req, res, next) => {
    const data = req.body;
    delete_film(data, (err, results) => {
      if (err) {
        next(err);
        return;
      } else return res.json({ message: "Deleted successfully" });
    });
  });
  //sort film with sepcified field (name or duration) and order ( descending or anscending)
  app.get("/film/order", (req, res, next) => {
    const data = req.body;
    get_film_order(data, (err, results) => {
      if (err) {
        next(err);
        return;
      }
      return res.json({ data: results });
    });
  });
  app.get("/revenue", (req, res, next) => {
    film_revenue((err, results) => {
      if (err) {
        next(err);
        return;
      }
      return res.json({ data: results });
    });
  });
  app.delete("/actor/delete", (req, res, next) => {
    const data = req.body;
    delete_actor(data, (err, results) => {
      if (err) {
        next(err);
        return;
      } else return res.json({ message: "Deleted successfully" });
    });
  });
  app.delete("/director/delete", (req, res, next) => {
    const data = req.body;
    delete_director(data, (err, results) => {
      if (err) {
        next(err);
        return;
      } else return res.json({ message: "Deleted successfully" });
    });
  });
};
