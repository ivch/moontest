const MessageHandlerInterface = require('../interfaces/handler.js');
const uuid = require('uuid');

module.exports = class MessageHandler extends MessageHandlerInterface {
    constructor(db) {
        super();

        if (typeof db === 'undefined') {
            throw new Error("db is not set");
        }
        this.db = db;
    }

    handleMessage(message, time) {
        time = parseInt(time);

        if (typeof message === "undefined" || typeof time === "undefined") {
            return {error: "message and time are mandatory fields"};
        }

        if (time.toString().length < 7 || time.toString().length > 13) {
            return {error: "incorrect time"};
        }

        let entry = {id: uuid.v4(), message: message, time: time};

        let err = this.db.put(entry);
        if (err != null) {
            //log error
            return {error: "failed to save message"}
        }

        return {};
    }
};
