const router = require('express').Router();
const controller = require('../controllers/user.controller');

router.get('/', controller.getUsers);
router.get('/:userId', controller.getUserById);

module.exports = router;