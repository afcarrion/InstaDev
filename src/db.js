const moongose = require('mongoose');

const { database } = require('./keys')

moongose.connect(database.URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    })
    .then(db => console.log('Connected DB'))
    .catch(error => console.error(error));

