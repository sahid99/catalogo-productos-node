const { Router } = require("express");
const router = Router();
const { signIn, signUp, session } = require("../controller/auth");
const { verifyToken } = require("../controller/verifyToken");

router.post("/signin", signIn);
router.post("/signUp", signUp);
router.get("/session", verifyToken, session);

module.exports = router;
