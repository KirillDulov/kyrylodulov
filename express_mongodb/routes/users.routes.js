const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.post('/', controller.insertOne);
router.post('/many', controller.insertMany);

router.get('/', controller.find);
router.get('/cursor', controller.findWithCursor);
router.get('/stats', controller.getStats);

router.patch('/:id', controller.updateOne);
router.patch('/', controller.updateMany);
router.put('/:id', controller.replaceOne);

router.delete('/:id', controller.deleteOne);
router.delete('/', controller.deleteMany);

module.exports = router;