const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get users route');
});

router.post('/theme', (req, res) => {
    const { theme } = req.body;

    if (!theme || !['light', 'dark'].includes(theme)) {
        return res.status(400).json({ message: 'Invalid theme value. Accepted values: "light" or "dark".' });
    }

    res.cookie('theme', theme, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.json({ message: `Theme '${theme}' saved successfully.` });
});

module.exports = router;