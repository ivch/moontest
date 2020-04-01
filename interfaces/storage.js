module.exports = class StorageInterface {
    constructor() {
        if (!this.put) {
            throw new Error("Storage is missing `put` method");
        }
        if (!this.get) {
            throw new Error("Storage is missing `get` method");
        }
        if (!this.delete) {
            throw new Error("Storage is missing `delete` method");
        }
    }
};