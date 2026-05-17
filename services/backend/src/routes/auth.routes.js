const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const validate = require("../validators/common.validator");
const { registerSchema, loginSchema } = require("../validators/auth.validator");
const { authenticate } = require("../middlewares/auth.middleware");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/me", authenticate, authController.me);

module.exports = router;
