const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

const path = __dirname + '/views/';
app.use(express.static(path));

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
app.use(cors({origin: 'http://localhost:8080'}))

// routes
// const path = __dirname + '/views/';
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});
app.use("/auth", auth);
app.use("/products", products);
app.use("/categories", categories);

// Empezando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server at http://localhost:${app.get("port")}`);
});

module.exports = app;
