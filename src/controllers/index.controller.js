const {sendMessage} = require('../twilio/send-sms');
const SMS = require('../models/sms');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const {getSocket} = require('../websockets');


const indexController = async (req, res) => {
    const messages = await SMS.find().sort('-createdAt').lean();
    messages.forEach(m => console.log(m.Body));
    res.render('index', {messages});
};

const postMessage = async (req, res) => {
    const {message, phone} = req.body;
    if (!message || !phone) return res.json('Missing message or phone');
    const result = await sendMessage(req.body.message, req.body.phone);
    await SMS.create({Body: req.body.message, From: req.body.phone});
    console.log(result.sid);
    res.redirect('/');
};

const receivedMessage = async (req, res) => {
    console.log(req.body);
    const saveSms = await SMS.create({
        Body: req.body.Body,
        From: req.body.From
    });
    getSocket().emit('new message', saveSms);
    const twiml = new MessagingResponse;
    //twiml.message('This is my response');
    res.send(twiml.toString());
};

module.exports = {
    indexController,
    postMessage,
    receivedMessage
};
