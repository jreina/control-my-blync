const express = require('express');
const _ = require('lodash');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json());

app.use(express.static('public'));

app.post('/set-color', function (req, res) {
    const valid = _.has(req.body, 'color') && Array.isArray(req.body.color);
    if (valid) {
        io.send(JSON.stringify(req.body));
        res.json('Setting color to ' + req.body.color);
    } else {
        res.status(500).json('Invalid request');
    }
});

server.listen(4000, function () {
    console.log('listening on ' + 4000);
})
