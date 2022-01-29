const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../controller/verifyToken");
const {
  addProduct,
  getProducts,
  //   modifyProduct,
  //   deleteProduct,
} = require("../controller/product");

router.get("/getProducts", getProducts);
router.post("/addProduct", addProduct);
// router.post("/modifyProduct", verifyToken, modifyProduct);
// router.post("/deleteProduct", verifyToken, deleteProduct);

module.exports = router;
