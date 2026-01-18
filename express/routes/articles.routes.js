const express = require('express');
const router = express.Router();

const articlesController = require('../controllers/articles.controller');

router.get('/', articlesController.getArticles);
router.post('/', articlesController.createArticle);

router.get('/:articleId', articlesController.getArticleById);
router.put('/:articleId', articlesController.updateArticle);
router.delete('/:articleId', articlesController.deleteArticle);

module.exports = router;