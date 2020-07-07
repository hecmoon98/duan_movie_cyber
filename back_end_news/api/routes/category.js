const express = require("express");
const routes = express.Router();
const categoryController = require('../controller/category');
const checkAuth = require('../middleware/check-auth')



routes.post("/",checkAuth, categoryController.category_post);

routes.get("/", categoryController.category_get_all);

routes.get("/:categoryId",checkAuth, categoryController.category_get_one);

// routes.patch("/:productId");

routes.put("/:categoryId",checkAuth, categoryController.category_put);

routes.delete("/:categoryId",checkAuth, categoryController.category_delete);

module.exports = routes;
