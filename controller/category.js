const connection = require("../db");

const addCategory = (req, res) => {
  const { name } = req.body;

  if (name) {
    connection.query(
      `insert into categories (id, name) values (NULL, '${name}')`,
      function (error, results, fields) {
        if (!error) {
          connection.query(
            "select * from categories",
            function (error, results, fields) {
              if (!error) {
                res.status(200).send(JSON.stringify(results));
              } else {
                res
                  .status(500)
                  .json([]);
              }
            }
          );
        } else {
          res
            .status(500)
            .json([]);
        }
      }
    );
  } else {
    return res.status(400).json([]);
  }
};

const getCategories = (req, res) => {
  connection.query(
    "select * from categories",
    function (error, results, fields) {
      if (!error) {
        res.status(200).json(results);
      } else {
        res
          .status(500)
          .json([]);
      }
    }
  );
};

const modifyCategory = (req, res) => {
  const { name, id } = req.body;

  if (name && id) {
    connection.query(
      "update categories set name = ? where id = ?",
      [name, id],
      function (error, results, fields) {
        if (!error) {
          connection.query(
            "select * from categories",
            function (error, results, fields) {
              if (!error) {
                res
                  .status(200)
                  .json(results);
              } else {
                res
                  .status(500)
                  .json([]);
              }
            }
          );
        } else {
          res
            .status(500)
            .json([]);
        }
      }
    );
  } else {
    return res.status(400).json([]);
  }
};

const deleteCategory = (req, res) => {
  const { id } = req.body;

  if (id) {
    connection.query(
      "delete from categories where id = ?",
      [id],
      function (error, results, fields) {
        if (!error) {
          connection.query(
            "select * from categories",
            function (error, results, fields) {
              if (!error) {
                res
                  .status(200)
                  .json(results);
              } else {
                res
                  .status(500)
                  .json([]);
              }
            }
          );
        } else {
          res
            .status(500)
            .json([]);
        }
      }
    );
  } else {
    return res.status(400).json([]);
  }
};

module.exports = { addCategory, getCategories, modifyCategory, deleteCategory };
