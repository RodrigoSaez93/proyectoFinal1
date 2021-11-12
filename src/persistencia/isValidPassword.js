const bCrypt = require('bcrypt')

const isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password)
}

module.exports = isValidPassword