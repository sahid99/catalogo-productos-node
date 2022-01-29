const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();

const connection = require("./db");

const products = require("./routes/product");
const categories = require("./routes/category");
const auth = require("./routes/auth");

//settings
dotenv.config({ path: "./.env" });
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.get("/", (req, res) => res.send("API Works!"));
app.use("/auth", auth);
app.use("/products", products);
app.use("/categories", categories);

// Empezando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server at http://localhost:${app.get("port")}`);
});

module.exports = app;
