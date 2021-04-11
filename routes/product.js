const express = require("express");
const router = express.Router();

const {getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories

} = require("../controllers/product");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes
//Create Routes
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);

//Read Routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//Delete Routes
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);

//Update Routes
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)

//Listing Routes
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;