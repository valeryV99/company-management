const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { createServer } = require('http');
const path = require('path');
const WebSocket = require('ws');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
// import Database from "./database";
// import Model from "./models";
// import AppRouter from "./routers";

const app = express();
const server = createServer(app);
app.wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//
// const database = new Database();
//
// database.connect().then((db) => {
//     app.db = db;
// }).catch((err) => {
//     throw(err);
// });

// app.models = new Model(app);
// app.routers = new AppRouter(app);

var schema = buildSchema(`
  type Query {
    hello: String,
    name: String
  }
`);

var root = {
    hello: () => {
        return 'Hello world!';
    },
    name: () => {
        return 'Valery'
    }
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(3000, () => {
    console.log("Example index listening on port 3000!");
});
