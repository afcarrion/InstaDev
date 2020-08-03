const express = require('express');
const server = require('./server/index');

require('./db');

const app = server(express());

app.listen(app.get('port'), () => {
    console.log(`Server listening http://localhost:${app.get('port')}`);
});