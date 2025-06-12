export class Database {
    constructor() {
        this.database = {};
    }

    getECounter(username) {
        if (this.database[username] == null) {
            this.database[username] = 0;
        }
        return this.database[username];
    }

    increaseECounter(username, amount) {
        if (this.database[username] == null) {
            this.database[username] = 0;
        }
        this.database[username] += amount;
        return this.database[username];
    }

    decreaseECounter(username, amount) {
        if (this.database[username] == null) {
            this.database[username] = 0;
        }
        this.database[username] = Math.max(0, this.database[username] - amount);
        return this.database[username];
    }
}