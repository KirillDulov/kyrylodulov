const express = require('express');
const router = express.Router();

const articlesController = require('../controllers/articles.controller');
const permissions = require('../middlewares/permissions.middleware');

router.get('/', permissions, articlesController.getArticles);
router.post('/', permissions, articlesController.createArticle);

router.get('/:articleId', permissions, articlesController.getArticleById);
router.put('/:articleId', permissions, articlesController.updateArticle);
router.delete('/:articleId', permissions, articlesController.deleteArticle);

module.exports = router;