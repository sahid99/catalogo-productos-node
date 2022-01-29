const { Router } = require("express");
const router = Router();
const { verifyToken } = require("../controller/verifyToken");
const {
  addCategory,
  getCategories,
  modifyCategory,
  deleteCategory,
} = require("../controller/category");

router.get("/getCategories", getCategories);
router.post("/addCategory", verifyToken, addCategory);
router.post("/modifyCategory", verifyToken, modifyCategory);
router.post("/deleteCategory", verifyToken, deleteCategory);

module.exports = router;
