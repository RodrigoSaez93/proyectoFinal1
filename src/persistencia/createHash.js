const bCrypt = require('bcrypt')

const createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

module.exports = createHash