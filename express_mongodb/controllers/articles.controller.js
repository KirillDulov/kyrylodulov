import mongoose from 'mongoose';
import Article from '../models/Article.js';

export const getArticles = async (req, res, next) => {
    try {
        const articles = await Article
            .find()
            .sort({ createdAt: -1 })
            .lean();

        res.render('articles/list', { articles });
    } catch (err) {
        next(err);
    }
};

export const getArticleById = async (req, res, next) => {
    try {
        const { articleId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(articleId)) {
            return res.status(400).render('errors/400');
        }

        const article = await Article
            .findById(articleId)
            .lean();

        if (!article) {
            return res.status(404).render('errors/404');
        }

        res.render('articles/detail', { article });
    } catch (err) {
        next(err);
    }
};