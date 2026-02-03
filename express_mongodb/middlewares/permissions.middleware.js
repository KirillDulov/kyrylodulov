function checkArticlePermissions(req, res, next) {
  const role = req.headers['role'];

  if (role !== 'admin') {
    return res.status(403).send('Forbidden: no access to articles');
  }

  next();
}

module.exports = checkArticlePermissions;