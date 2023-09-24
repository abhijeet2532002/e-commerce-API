const router = require("express").Router();

const { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById } = require("../controllers/products");

// get all products
router.route("/").get(getAllProducts);

// get product by id
router.route("/:id").get(getProductById);

// create new product
router.route("/create").post(createProduct);

// update product's quantity
router.route("/update_quantity/:id").post(updateProductById);

// delete product by id
router.route("/:id").delete(deleteProductById);


module.exports = router;