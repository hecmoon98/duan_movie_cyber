const express = require("express");
const routes = express.Router();
const newsController = require("../controller/news");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const storage = multer.diskStorage({
  //2
  destination: function(req, file, cd) {
    cd(null, "./uploads/");
  },
  filename: function(req, file, cd) {
    cd(null, file.originalname);
  }
});

const fileFilter = (req, file, cd) => {
  // 4 reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cd(null, true);
  } else {
    cd(null, false);
  }
};

const upload = multer({
  //3
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const cpUpload = upload.fields([
  { name: "newsImages" },
  { name: "newsImages2" },
  { name: "newsImages3" }
]);

routes.post("/", cpUpload, newsController.news_post);

routes.get("/", newsController.news_get_all);

routes.get("/:newId", newsController.news_get_one);

// routes.patch("/:newId");

routes.put("/:newId", checkAuth, newsController.news_put);

routes.delete("/:newId", newsController.news_delete);

module.exports = routes;
