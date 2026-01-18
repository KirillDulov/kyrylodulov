const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');

router.get('/', auth, userController.getUsers);
router.post('/', auth, validate, userController.createUser);

router.get('/:userId', auth, userController.getUserById);
router.put('/:userId', auth, userController.updateUser);
router.delete('/:userId', auth, userController.deleteUser);

module.exports = router;