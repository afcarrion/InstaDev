const moment = require('moment');
const helpers = {}

helpers.tiempoAtras = (timestamp) => {
    return moment(timestamp).startOf('minutes').fromNow();
};

module.exports = helpers;