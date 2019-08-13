require('./models/User');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRouter);

const mongoUri =
  'mongodb+srv://admin:Password1@cluster0-pbvql.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.on('connected', () => console.log('Connected to mongo instance'));
mongoose.connection.on('error', err => console.error('Error connecting to mongo', err));

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
