const connection = require("../database");
module.exports.getFilm = async (req, res) => {
  const query = `SELECT movie_ID, genre, release_day, movie_name,
         duration, restriction, Company_name FROM movie`;
  const [result, fileld] = await connection.query(query);
  res.json(result);
};
