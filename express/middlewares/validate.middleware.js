function validateUserInput(req, res, next) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send('Missing required field: name');
    }

    next();
}

module.exports = validateUserInput;