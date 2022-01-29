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
router.post("/addCategory", addCategory);
router.post("/modifyCategory", modifyCategory);
router.post("/deleteCategory", deleteCategory);

module.exports = router;
