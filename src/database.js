const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/smsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('database is connected'))
    .catch(err => console.log(err));
