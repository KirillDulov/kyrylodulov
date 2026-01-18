exports.getArticles = (req, res) => {
    res.send('Get articles route');
};

exports.createArticle = (req, res) => {
    res.send('Post articles route');
};

exports.getArticleById = (req, res) => {
    const { articleId } = req.params;
    res.send(`Get article by Id route: ${articleId}`);
};

exports.updateArticle = (req, res) => {
    const { articleId } = req.params;
    res.send(`Put article by Id route: ${articleId}`);
};

exports.deleteArticle = (req, res) => {
    const { articleId } = req.params;
    res.send(`Delete article by Id route: ${articleId}`);
};