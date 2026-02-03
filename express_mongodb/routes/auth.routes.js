const express = require('express');
const bcrypt = require('bcrypt');
const { passport, users } = require('../config/passport');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const hashed = await bcrypt.hash(password, 10);
    users.push({ email, password: hashed });

    res.json({ message: 'User registered successfully' });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Logged in successfully' });
});

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ message: 'Logged out' });
    });
});

module.exports = router;