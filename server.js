const express = require('express');
const _ = require('lodash');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 8080;

app.use(express.json());

app.use(express.static('public'));

app.post('/set-color', function (req, res) {
    const valid = _.has(req.body, 'color') && Array.isArray(req.body.color);
    if (valid) {
        io.emit('color', JSON.stringify(req.body));
        res.json('Setting color to ' + req.body.color);
    } else {
        res.status(500).json('Invalid request');
    }
});

app.post('/set-pattern', function (req, res) {
    const valid = _.has(req.body, 'pattern') && _.isString(req.body.pattern);
    if (valid) {
        io.emit('pattern', JSON.stringify(req.body));
        res.json('Setting pattern to ' + req.body.pattern);
    } else {
        res.status(500).json('Invalid request');
    }
});

server.listen(port, function () {
    console.log('listening on ' + port);
})
