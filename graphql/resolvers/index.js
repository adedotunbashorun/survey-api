
const authResolver = require('./auth');
const userdataResolver = require('./userdata');
const surveysResolver = require('./surveys');
const questionsResolver = require('./questions');

const rootResolver = {
    ...authResolver,
    ...userdataResolver,
    ...surveysResolver,
    ...questionsResolver
}

module.exports = rootResolver;