const pool = require("./database");
//logic
module.exports = {
  login: (data, callBack) => {
    pool.query(
      `select * from smanager where EMAIL = ?`,
      [data.email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        if (results.length > 0)
          if (results[0].PASSWORD == data.password)
            return callBack(null, "success");
        return callBack(null);
      }
    );
  },
  create_film: (data, callBack) => {
    const query1 = `insert into movie(genre,release_day, movie_name, duration,restriction) 
      values(?,?,?,?,?)`;
    pool.query(
      query1,
      [
        data.genre,
        data.release_day,
        data.movie_name,
        data.duration,
        data.restriction,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        } else {
          callBack(null, results);
        }
      }
    );
  },
  film_update: (data, callBack) => {
    const query = `
      UPDATE movie
      SET movie_ID = ?,genre = ?, release_day = ?, movie_name = ?, duration = ?, restriction = ?
      WHERE movie_ID = ?
    `;
    const values = [
      data.movie_ID,
      data.genre,
      data.release_day,
      data.movie_name,
      data.duration,
      data.restriction,
      data.old_movie_ID,
    ];
    pool.query(query, values, (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results);
      }
    });
  },
  create_film_company: (data, callBack) => {
    const query1 = `INSERT INTO productioncompany(Cname,country,address) 
      values(?,?,?)`;
    const query2 = `UPDATE movie
      SET Company_name = ?
      WHERE movie_name = ?`;
    pool.query(
      query1,
      [data.Cname, data.country, data.address],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        } else {
          pool.query(
            query2,
            [data.Cname, data.movie_name],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              } else {
                callBack(null, results);
              }
            }
          );
        }
      }
    );
  },
  update_film_company: (data, callBack) => {
    const query = `
      UPDATE productioncompany
      SET Cname = ?, country = ?, address = ?
      WHERE Cname = ?
    `;
    const query2 = `UPDATE movie
      SET Company_name = ?
      WHERE movie_name = ?`;
    const values = [data.Cname, data.country, data.address, data.old_Cname];
    pool.query(query, values, (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        const values2 = [data.Cname, data.movie_name];
        pool.query(query2, values2, (error, results, fields) => {
          if (error) {
            callBack(error);
          } else {
            callBack(null, results);
          }
        });
      }
    });
  },
  create_film_director: (data, callBack) => {
    const query1 = `INSERT INTO director (D_Name, dob, nationality)
      values(?,?,?)`;
    const query2 = `INSERT INTO direct (Direct_name, movie_ID)
      VALUES (?, (SELECT movie_ID FROM movie WHERE movie_name = ?))`;
    pool.query(
      query1,
      [data.D_name, data.dob, data.nationality],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        } else {
          pool.query(
            query2,
            [data.D_name, data.movie_name],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              } else {
                callBack(null, results);
              }
            }
          );
        }
      }
    );
  },
  update_film_director: (data, callBack) => {
    const query = `
      UPDATE director
      SET D_name = ?, dob = ?, nationality = ?
      WHERE D_name = ?
    `;
    const values = [data.D_name, data.dob, data.nationality, data.old_D_name];
    pool.query(query, values, (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results);
      }
    });
  },
  create_film_actor: (data, callBack) => {
    const query1 = `INSERT  INTO actor ( nationality,dob,name)
      values(?,?,?)`;
    const query2 = `INSERT  INTO perform (Actor_ID, movie_ID)
      values((SELECT Actor_ID FROM actor WHERE name = ?), 
              (SELECT movie_ID FROM movie WHERE movie_name = ?))`;
    pool.query(
      query1,
      [data.nationality, data.dob, data.name],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        } else {
          pool.query(
            query2,
            [data.name, data.movie_name],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              } else {
                callBack(null, results);
              }
            }
          );
        }
      }
    );
  },
  update_film_actor: (data, callBack) => {
    const query = `
      UPDATE actor
      SET nationality = ?, dob = ?, name = ?,
      WHERE Actor_ID = ?
    `;
    const values = [data.nationality, data.dob, data.name, data.Actor_ID];
    pool.query(query, values, (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results);
      }
    });
  },
  get_film: (callBack) => {
    const query = `SELECT movie_ID, genre, release_day, movie_name,
       duration, restriction, Company_name FROM movie`;
    pool.query(query, (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        const formattedResults = results.map((row) => {
          const releaseDay = new Date(row.release_day);
          const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
          };
          const formattedReleaseDay = formatDate(releaseDay);
          return { ...row, release_day: formattedReleaseDay };
        });
        callBack(null, formattedResults);
      }
    });
  },
  get_actor: (data, callBack) => {
    const query = `select name
      from actor NATURAL JOIN perform
      WHERE movie_ID = ? `;
    pool.query(query, [data.movie_ID], (error, results, fields) => {
      if (error) callBack(error);
      else callBack(null, results);
    });
  },
  get_director: (data, callBack) => {
    pool.query(
      `SELECT director.D_Name
        FROM director
        JOIN direct ON director.D_Name = direct.Direct_name
        WHERE direct.movie_ID = ?`,
      [data.movie_ID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        } else {
          callBack(null, results);
        }
      }
    );
  },
  get_film_field: (input, callBack) => {
    const query = `
      SELECT * FROM movie
      WHERE genre LIKE ?  OR movie_name LIKE ? OR Company_name LIKE ?`;
    const values = [`%${input}%`, `%${input}%`, `%${input}%`];
    pool.query(query, values, (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        const formattedResults = results.map((row) => {
          const releaseDay = new Date(row.release_day);
          const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
          };
          const formattedReleaseDay = formatDate(releaseDay);
          return { ...row, release_day: formattedReleaseDay };
        });
        callBack(null, formattedResults);
      }
    });
  },
  get_film_order: (data, callBack) => {
    let query = `
      SELECT * FROM movie
      ORDER BY
    `;
    if (data.field === "name") {
      query += `movie_name ${data.sort_order}`;
    } else if (data.field === "duration") {
      query += `duration ${data.sort_order}`;
    } else {
      // Handle invalid sortBy value
      callBack(new Error("Invalid value"));
      return;
    }
    pool.query(query, (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        const formattedResults = results.map((row) => {
          const releaseDay = new Date(row.release_day);
          const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
          };
          const formattedReleaseDay = formatDate(releaseDay);
          return { ...row, release_day: formattedReleaseDay };
        });
        callBack(null, formattedResults);
      }
    });
  },
  delete_film: (data, callBack) => {
    const query1 = `DELETE director
      FROM director
      JOIN Direct ON director.D_Name = Direct.Direct_name
      WHERE Direct.movie_ID = ?`;
    const query = `DELETE FROM direct
      WHERE movie_ID = ?
      `;
    const query3 = `DELETE actor
      FROM actor
      JOIN perform ON actor.Actor_ID = perform.Actor_ID
      WHERE perform.movie_ID = ?`;
    const query2 = `DELETE FROM perform
      WHERE movie_ID = ?
      `; //
    const query4 = `
      DELETE FROM movie
      WHERE movie_ID = ?
      `;
    const values = [data.movie_ID];
    pool.query(query, values, (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        pool.query(query1, values, (error, results, fields) => {
          if (error) {
            callBack(error);
          } else {
            pool.query(query2, values, (error, results, fields) => {
              if (error) {
                callBack(error);
              } else {
                pool.query(query3, values, (error, results, fields) => {
                  if (error) {
                    callBack(error);
                  } else {
                    pool.query(query4, values, (error, results, fields) => {
                      if (error) {
                        callBack(error);
                      } else {
                        callBack(null, results);
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  },
  film_revenue: (callBack) => {
    const query = `
    SELECT
        MONTHS.month,
        COALESCE(SUM(BILL.TOTAL_PRICE), 0) AS total_price,
        COALESCE(SUM(BILL.FINAL_PRICE), 0) AS final_price
    FROM
        (
          SELECT 1 AS month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
          UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8
          UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
        ) AS MONTHS
    LEFT JOIN
        BILL ON MONTHS.month = MONTH(BILL.printing_day)
          AND YEAR(BILL.printing_day) = YEAR(CURRENT_DATE())
    GROUP BY
        MONTHS.month
    ORDER BY
        MONTHS.month
  `;
    pool.query(query, (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        callBack(null, results);
      }
    });
  },
  get_film_duration: (data, callBack) => {
    const query = `
      SELECT * FROM movie
      WHERE duration BETWEEN ? AND ?
    `;
    const values = [parseInt(data.min), parseInt(data.max)];
    pool.query(query, values, (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        const formattedResults = results.map((row) => {
          const releaseDay = new Date(row.release_day);
          const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
          };
          const formattedReleaseDay = formatDate(releaseDay);
          return { ...row, release_day: formattedReleaseDay };
        });
        callBack(null, formattedResults);
      }
    });
  },
  delete_actor: (data, callBack) => {
    const query1 = `DELETE FROM actor
      WHERE ACTOR_ID = ?`;
    const query2 = `DELETE FROM perform
      WHERE movie_ID = ? AND ACTOR_ID = ?
      `;
    const values = [data.ACTOR_ID, data.movie_ID, data.ACTOR_ID];
    pool.query(query1, values, (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        pool.query(query2, values, (error, results, fields) => {
          if (error) {
            callBack(error);
          } else {
            callBack(null, results);
          }
        });
      }
    });
  },
  delete_director: (data, callBack) => {
    const query1 = `DELETE FROM director
      WHERE D_name = ?`;
    const query2 = `DELETE FROM direct
      WHERE movie_ID = ? AND Direct_name = ?
      `;
    const values = [data.D_name, data.movie_ID, data.D_name];
    pool.query(query1, values, (error, results, fields) => {
      if (error) {
        callBack(error);
      } else {
        pool.query(query2, values, (error, results, fields) => {
          if (error) {
            callBack(error);
          } else {
            callBack(null, results);
          }
        });
      }
    });
  },
};
