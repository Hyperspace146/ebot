import fs from 'node:fs';

export class Database {
    constructor(filepath) {
        this.readDatabaseFromFile(filepath);
    }

    getECounter(username) {
        if (this.database[username] == null) {
            this.database[username] = 0;
        }
        return this.database[username];
    }

    getELeaderboard(leaderboardLength) {
        var sortedEntries = Object.entries(this.database)
            .sort(([, eCount1], [, eCount2]) => eCount2 - eCount1)
            .filter(entry => entry[0] !== "ebot");
        return sortedEntries.slice(0, leaderboardLength);
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

    setECounter(username, amount) {
        if (this.database[username] == null) {
            this.database[username] = 0;
        }
        this.database[username] = amount;
        return this.database[username];
    }

    writeDatabaseToFile(filepath) {
        console.log(`Saving database to file path ${filepath}...`);
        fs.writeFileSync(filepath, JSON.stringify(this.database, null, 2) , 'utf-8');
        console.log("Done saving.")
    }

    readDatabaseFromFile(filepath) {
        console.log(`Reading database from file path ${filepath}...`);
        this.database = JSON.parse(fs.readFileSync(filepath));
    }
}