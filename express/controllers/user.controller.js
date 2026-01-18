exports.getUsers = (req, res) => {
    res.send('Get users route');
};

exports.createUser = (req, res) => {
    res.send('Post users route');
};

exports.getUserById = (req, res) => {
    const { userId } = req.params;
    res.send(`Get user by Id route: ${userId}`);
};

exports.updateUser = (req, res) => {
    const { userId } = req.params;
    res.send(`Put user by Id route: ${userId}`);
};

exports.deleteUser = (req, res) => {
    const { userId } = req.params;
    res.send(`Delete user by Id route: ${userId}`);
};