const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { typeDefs, resolvers } = require('./schemas');
require('dotenv').config();

const middlewares = require('./utils/middlewares');
const { authMiddleware } = require('./utils/auth');

const trips = require('./api/trips');
const auth = require('./api/auth');
const users = require('./api/users');
const itineraries = require('./api/itineraries');
const budgets = require('./api/budgets');
const notes = require('./api/notes');
const db = require('./config/connection');

const app = express();

app.use(morgan('common'));
app.use(helmet({
  crossOriginEmbedderPolicy: false,
}));
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.use('/api/trips', trips);
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/itineraries', itineraries);
app.use('/api/budgets', budgets);
app.use('/api/notes', notes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

const PORT = process.env.PORT || 1337;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`,
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);
