const express = require("express");
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/shopController");
const router = express.Router();

router.route('/product/:id')
        .put(updateProduct)
        .delete(deleteProduct);

router.route('/product')
        .get(getProducts)
        .post(createProduct)

module.exports = router;