const express = require("express");
const { getProducts, createProduct, updateProduct, deleteProduct, getProductById } = require("../controllers/shopController");
const router = express.Router();

router.route('/product/:id')
        .put(updateProduct)
        .delete(deleteProduct)
        .get(getProductById);

router.route('/product')
        .get(getProducts)
        .post(createProduct)

module.exports = router;