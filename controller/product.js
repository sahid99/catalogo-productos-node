const connection = require("../db");

const addProduct = (req, res) => {
  const { name, price, url, description, category } = req.body;

  if (name && price && url && description && category) {
    connection.query(
      `insert into products (id, name, price, url, description, category) values (NULL, '${name}', ${price}, '${url}', '${description}', '${category}')`,
      function (error, results, fields) {
        if (!error) {
          connection.query(
            "select * from products",
            function (error, results, fields) {
              if (!error) {
                res
                  .status(200)
                  .json(results);
              } else {
                res.status(500).json([]);
              }
            }
          );
        } else {
          res.status(500).json([]);
        }
      }
    );
  } else {
    return res.status(400).json([]);
  }
};

const getProducts = (req, res) => {
  connection.query("select * from products", function (error, results, fields) {
    if (!error) {
      res.status(200).json(results);
    } else {
      res.status(500).json([]);
    }
  });
};

const modifyProduct = (req, res) => {
  const { id, name, price, url, description, category } = req.body;

  if (id && name && price && url && description && category) {
    connection.query(
      "update products set name = ?, price = ?, url = ?, description = ?, category = ? where id = ?",
      [name, price, url, description, category, id],
      function (error, results, fields) {
        if (!error) {
          connection.query(
            "select * from products",
            function (error, results, fields) {
              if (!error) {
                res
                  .status(200)
                  .json(results);
              } else {
                res.status(500).json([]);
              }
            }
          );
        } else {
          res.status(500).json([]);
        }
      }
    );
  } else {
    return res.status(400).json([]);
  }
};

const deleteProduct = (req, res) => {
  const { id } = req.body;

  if (id) {
    connection.query(
      "delete from products where id = ?",
      [id],
      function (error, results, fields) {
        if (!error) {
          connection.query(
            "select * from products",
            function (error, results, fields) {
              if (!error) {
                res
                  .status(200)
                  .json(results);
              } else {
                res.status(500).json([]);
              }
            }
          );
        } else {
          res.status(500).json([]);
        }
      }
    );
  } else {
    return res.status(400).json([]);
  }
};

module.exports = { addProduct, getProducts, modifyProduct, deleteProduct };
