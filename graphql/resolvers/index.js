
const authResolver = require('./auth');
const userdataResolver = require('./userdata');
const surveysResolver = require('./surveys');

const rootResolver = {
    ...authResolver,
    ...userdataResolver,
    ...surveysResolver
}

module.exports = rootResolver;