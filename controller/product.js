const connection = require("../db");

const addProduct = (req, res) => {
  const { name, price, url, description, categories } = req.body;

  if (name && price && url && description && categories) {
    const categoriesSting = JSON.stringify(categories);

    connection.query(
      `insert into Products (id, name, price, url, description, categories) values (NULL, '${name}', ${price}, '${url}', '${description}', '${categories}')`,
      function (error, results, fields) {
        if (!error) {
          connection.query(
            "select * from Products",
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
  connection.query("select * from Products", function (error, results, fields) {
    if (!error) {
      res.status(200).send(JSON.stringify(results));
    } else {
      res.status(500).send([]);
    }
  });
};

// const modifyProduct = async (req, res) => {
//   const { db } = await connectToDatabase();
//   const { name, price, url, description, categories, _id } = req.body;

//   if (description && name && price && url && categories) {
//     const getProduct = await db
//       .collection("Product_manager")
//       .findOne({ _id: ObjectId(_id) });

//     if (!getProduct) {
//       return res.status(401).json({
//         success: false,
//         message: "The Product doesn't exists in database.",
//       });
//     }

//     const ProductObj = {
//       name,
//       price,
//       url,
//       description,
//       categories,
//     };

//     const resultUpdate = await db
//       .collection("Product_manager")
//       .updateOne({ _id: ObjectId(_id) }, { $set: ProductObj });
//     const result = await db.collection("Product_manager").toArray();

//     return res.status(200).json(result);
//   }

//   return res.status(500).json({ success: false, message: "Server error" });
// };

// const deleteProduct = async (req, res) => {
//   const { db } = await connectToDatabase();
//   const { _id } = req.body;

//   if (_id) {
//     const getProduct = await db
//       .collection("Product_manager")
//       .findOne({ _id: ObjectId(_id) });

//     if (!getProduct) {
//       return res.status(401).json({
//         success: false,
//         message: "The Product doesn't exists in database.",
//       });
//     }

//     const resultDelete = await db
//       .collection("Product_manager")
//       .findOneAndDelete({ _id: ObjectId(_id) });

//     const result = await db.collection("Product_manager").toArray();

//     return res.status(200).json(result);
//   }

//   return res.status(500).json({ success: false, message: "Server error" });
// };

// module.exports = { addProduct, getProducts, modifyProduct, deleteProduct };
module.exports = { addProduct, getProducts };
