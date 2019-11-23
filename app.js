const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');
const resolver = require('./graphql/resolvers');

const { Cors } = require('./middleware/cors');

const app = express();


app.use(bodyParser.json());

// cross origin middleware
app.use(Cors);

app.use(isAuth);

app.use('/graphql', graphqlHttp({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-twi1m.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, 
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() =>{
    console.log('connected');
    app.listen(8000);
})
.catch((error) => {
    console.error(error)
})