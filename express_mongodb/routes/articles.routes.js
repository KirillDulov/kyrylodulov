const router = require('express').Router();
const controller = require('../controllers/articles.controller');

router.get('/', controller.getArticles);
router.get('/:articleId', controller.getArticleById);

module.exports = router;