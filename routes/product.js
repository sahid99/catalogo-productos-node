const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../controller/verifyToken");
const {
  addProduct,
  getProducts,
  modifyProduct,
  deleteProduct,
} = require("../controller/product");

router.get("/getProducts", getProducts);
router.post("/addProduct", addProduct);
router.post("/modifyProduct", modifyProduct);
router.post("/deleteProduct", deleteProduct);

module.exports = router;
