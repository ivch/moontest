const StorageInterface = require('../interfaces/storage');

module.exports = class Storage extends StorageInterface {
    constructor(args) {
        super();
        if (typeof args.redis === 'undefined') {
            throw new Error("redis client is not set");
        }

        this.db = args.redis;
        this.setname = args.setname || 'defaultset';
    }

    put(entry) {
        //there should be entry struct validation
        //skipped to save time
        this.db.zadd(this.setname, entry.time, entry.id);
        this.db.set(entry.id, JSON.stringify(entry));
        return null;
    }

    get(callback) {
        this.db.multi().zrange(this.setname, 0, 0, 'withscores').exec((err, ent) => {
            if (ent[0].length === 0) {
                return;
            }

            this.db.zrem(this.setname, ent[0][0]);
            this.db.get(ent[0][0], (err, reply) => {
                callback(reply);
            });
        });
    }

    delete(key) {
        this.db.del(key);
    }
};