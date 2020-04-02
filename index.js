const cfg = require('./config.json');
const express = require('express');
const app = express();
const port = cfg.app.port || '3000';
const redis = require("redis").createClient({host: cfg.redis.host, port: cfg.redis.port});
const Storage = require('./storage/storage');
const storage = new Storage({redis: redis, setname: cfg.redis.setname});
const Handler = require('./components/messageHandler');
const handler = new Handler(storage);
const Worker = require('./components/messageWorker');
const worker = new Worker(storage);

app.use(express.json());

app.post('/echoAtTime', (request, response) => {
    let res = handler.handleMessage(request.body.message, request.body.time);

    if (typeof res.error === 'undefined') {
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