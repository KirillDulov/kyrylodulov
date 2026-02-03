const express = require('express');
const router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: 'Unauthorized' });
}

router.get('/', ensureAuthenticated, (req, res) => {
    res.json({ message: `Hello ${req.user.email}, this is a protected route.` });
});

module.exports = router;