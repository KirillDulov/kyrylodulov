const articles = [
    { id: 1, title: 'Express.js', content: 'Express basics' },
    { id: 2, title: 'Template engines', content: 'PUG & EJS' },
];

exports.getArticles = (req, res) => {
    res.render('articles/list.ejs', { articles });
};

exports.getArticleById = (req, res) => {
    const article = articles.find(a => a.id === Number(req.params.articleId));
    if (!article) return res.status(404).send('Article not found');

    res.render('articles/detail.ejs', { article });
};