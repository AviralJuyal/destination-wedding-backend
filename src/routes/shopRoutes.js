const express = require("express");
const { getProducts, createProduct, updateProduct, deleteProduct, getProductById, idProducts } = require("../controllers/shopController");
const router = express.Router();

router.route('/product/:id')
        .put(updateProduct)
        .delete(deleteProduct)
        .get(getProductById);

router.route('/product')
        .get(getProducts)
        .post(createProduct)

router.route('/idProducts')
        .post(idProducts)

module.exports = router;