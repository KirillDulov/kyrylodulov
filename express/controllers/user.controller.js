const users = [
    { id: 1, name: 'Іван', age: 22 },
    { id: 2, name: 'Марія', age: 28 },
];

exports.getUsers = (req, res) => {
    res.render('users/list', { users });
};

exports.getUserById = (req, res) => {
    const user = users.find(u => u.id === Number(req.params.userId));
    if (!user) return res.status(404).send('User not found');

    res.render('users/detail', { user });
};