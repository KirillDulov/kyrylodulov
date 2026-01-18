let users = [];

exports.getUsers = (req, res) => {
    res.send(JSON.stringify(users));
};

exports.createUser = (req, res) => {
    const { id, name } = req.body;
    users.push({ id, name });
    res.send(`Users created: ${name}`);
};

exports.getUserById = (req, res) => {
    const user = users.find(u => u.id == req.params.userId);
    if (!user) return res.send('User not found');
    res.send(JSON.stringify(user));
};

exports.updateUser = (req, res) => {
    res.send(`Put user by Id route: ${req.params.userId}`);
};

exports.deleteUser = (req, res) => {
    res.send(`Delete user by Id route: ${req.params.userId}`);
};