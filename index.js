const cfg = require('./config.json');
const express = require('express');
const app = express();
const port = cfg.app.port || '3000';
const redis = require("redis").createClient({host: cfg.redis.host, port: cfg.redis.port});
const store = require('./storage/storage');
const db = new store({redis: redis, setname: cfg.redis.setname});
const handler = require('./components/messageHandler');
const messageHandler = new handler(db);
const w = require('./components/messageWorker');
const worker = new w(db);

app.use(express.json());

app.post('/echoAtTime', (request, response) => {
    let res = messageHandler.handleMessage(request.body.message, request.body.time);

    if (typeof res.err === 'undefined') {
        response.sendStatus(200);
        return;
    }

    response.sendStatus(400);
    response.send(JSON.stringify({error: res.error}));
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});

worker.run();