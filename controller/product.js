const connection = require("../db");

const addProduct = (req, res) => {
  const { name, price, url, description, categories } = req.body;

  if (name && price && url && description && categories) {
    const categoriesSting = JSON.stringify(categories);

    connection.query(
      `insert into products (id, name, price, url, description, categories) values (NULL, '${name}', ${price}, '${url}', '${description}', '${categories}')`,
      function (error, results, fields) {
        if (!error) {
          connection.query(
            "select * from products",
            function (error, results, fields) {
              if (!error) {
                res.status(200).send(JSON.stringify(results));
              } else {
                res.status(500).send([]);
              }
            }
          );
        } else {
          res.status(500).send(error);
        }
      }
    );
  } else {
    return res.status(400).json({ success: false, message: "Bad request" });
  }
};

const getProducts = (req, res) => {
  connection.query("select * from products", function (error, results, fields) {
    if (!error) {
      res.status(200).send(JSON.stringify(results));
    } else {
      res.status(500).send([]);
    }
  });
};

const modifyProduct = (req, res) => {
  const { id, name, price, url, description, categories } = req.body;

  if (id && name && price && url && description && categories) {
    connection.query(
      "update products set name = ?, price = ?, url = ?, description = ?, categories = ? where id = ?",
      [name, price, url, description, categories, id],
      function (error, results, fields) {
        if (!error) {
          connection.query(
            "select * from products",
            function (error, results, fields) {
              if (!error) {
                res.status(200).send(JSON.stringify(results));
              } else {
                res.status(500).send([]);
              }
            }
          );
        } else {
          res.status(500).send(error);
        }
      }
    );
  } else {
    return res.status(400).json({ success: false, message: "Bad request" });
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
                res.status(200).send(JSON.stringify(results));
              } else {
                res.status(500).send([]);
              }
            }
          );
        } else {
          res.status(500).send(error);
        }
      }
    );
  } else {
    return res.status(400).json({ success: false, message: "Bad request" });
  }
};

module.exports = { addProduct, getProducts, modifyProduct, deleteProduct };
