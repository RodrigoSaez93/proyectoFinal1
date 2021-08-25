const fs = require("fs/promises");

class FileHandler {
    constructor(filename) {
        this.filename = filename;
    }

    async append(text) {
        await fs.appendFile(this.filename, text, 'utf-8');
    }
}

module.exports = FileHandler;