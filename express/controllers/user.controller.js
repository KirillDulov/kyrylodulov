const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ⚠️ для прикладу — без БД
const users = [];

exports.register = async (req, res) => {
    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);
    users.push({ id: users.length + 1, email, password: hash });

    res.status(201).json({ message: 'Registered' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
    });

    res.json({ message: 'Logged in' });
};