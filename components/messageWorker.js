module.exports = class MessageWorker {
    constructor(db) {
        if (typeof db === 'undefined') {
            throw new Error("db is not set");
        }
        this.db = db;
    }

    run() {
        setTimeout(() => {
            this.db.get(this.processMessage.bind(this));
            this.run();
        }, 2000);
    }

    processMessage(message) {
        if (message === null) {
            return;
        }

        let entry = JSON.parse(message);
        let now = Date.now() / 1000;

        if (now < parseInt(entry.time)) {
            this.db.put(entry);
            return;
        }
        this.db.delete(entry.id);
        console.log(">> " + entry.message + " <<");
    }
};