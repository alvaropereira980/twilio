const timeago = require('timeago.js');
module.exports = {

    hidenumber: (phoneNumber = '') => {
        return phoneNumber.replace(/[0-9]/g, 'x')
    },

    timeago: (date) => {
        return timeago.format(date);
    }
};
