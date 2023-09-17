const express = require("express");
const articleControl = require("../../controls/article");
const route = express.Router();

route.get("/", articleControl.queryArticlesAll);
route.get("/detail", articleControl.queryArticleDetail);
route.post("/enable", articleControl.enableArticle);
route.post("/update", articleControl.updateArticle);

module.exports = route;