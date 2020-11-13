const {Router} = require('express');
const router = Router();

const {indexController, postMessage, receivedMessage} = require('../controllers/index.controller');

// Main route
router.get('/', indexController);

// Send an SMS
router.post('/send-sms', postMessage);

// Receive an SMS
router.post('/sms', receivedMessage);

module.exports = router;
