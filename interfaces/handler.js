module.exports = class MessageHandlerInterface {
    constructor() {
        if (!this.handleMessage) {
            throw new Error("MessageHandler is missing `handleMessage` method");
        }
    }
};