const mysqlPool = require("../../mysql");
const { queryArticlesMain } = require('../main/article')

module.exports = {
  queryArticles: async (req, res) => {
    const { pageNum = 1, pageSize = 10 } = req.query
    queryArticlesMain(pageNum, pageSize, true).then(data => {
      res.customLimitSend(data.articles, data.articleTotal);
    })
  },
  // 启用文章
  enableArticle: (req, res) => {
    const { id, is_enable } = req.body;
    mysqlPool
      .query({
        sql: "UPDATE `article` SET `is_enable` = ?  WHERE `id` = ?",
        params: [is_enable, id],
      })
      .then((data) => {
        res.customSend(data);
      });
  },
  queryArticleDetail: (req, res) => {
    const { id } = req.query;
    mysqlPool
      .query({
        sql: "SELECT `id`,`description`,`content` FROM article WHERE `id` = ? ",
        params: [id],
      })
      .then((data) => {
        res.customSend(...data);
      });
  },
  updateArticle: (req, res) => {
    const { id, title, description, content, categoryId, tagIds, words } = req.body;
    mysqlPool.query({
      sql: "UPDATE `article` SET `title` = ?, `description` = ?, `content` = ?, `category_id` = ?, `tag_ids` = ?, `words` = ? WHERE `id` = ?",
      params: [title, description, content, categoryId, tagIds, words, id]
    }).then(data => {
      res.customSend(data);
    })
  }
}