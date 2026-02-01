const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const users = [];

const SECRET_KEY = 'SECRET_KEY';

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

    const hashed = await bcrypt.hash(password, 10);
    users.push({ username, password: hashed });

    res.json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    res.json({ message: 'Logged in successfully' });
});

function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Token required' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}

router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: `Hello, ${req.user.username}! This is your profile.` });
});

module.exports = router;