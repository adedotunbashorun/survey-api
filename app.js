const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');
const resolver = require('./graphql/resolvers');
const morgan = require('morgan');

const { Cors } = require('./middleware/cors');

const { env } = require('./config');

const app = express();


app.use(bodyParser.json());

// cross origin middleware
app.use(Cors);

app.use(morgan('dev'));

app.use(isAuth);

app.use('/graphql', graphqlHttp({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

mongoose.connect(`mongodb://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@ds027521.mlab.com:27521/${env.MONGO_DB}`, 
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() =>{
    console.log('connected');
    app.listen(8000);
})
.catch((error) => {
    console.error(error)
})