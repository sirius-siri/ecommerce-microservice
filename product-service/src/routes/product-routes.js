const router = require("express").Router();
const { createProduct } = require("../controllers/product-controller");

router.post("/create", createProduct);

module.exports = router;
