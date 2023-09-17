const express = require("express");
const tagControl = require("../../controls/cms/tag");
const route = express.Router();

route.post("/create", tagControl.createTag);
route.post("/delete", tagControl.deleteTag);
route.post("/update", tagControl.updateTag);
route.post("/enable", tagControl.enableTag);
route.get("/", tagControl.queryTags);
route.get("/simple", tagControl.queryTagsSimple);

module.exports = route;
