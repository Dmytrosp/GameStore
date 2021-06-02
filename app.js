const path = require('path');
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');

const globalErrorHandler = require('./controllers/errorController');

const taxesRouter = require('./routes/taxesRouter');
const licenseRouter = require('./routes/licenseRouter');
const gameRouter = require('./routes/gameRouter');
const reviewRouter = require('./routes/reviewRouter');
const storeRouter = require('./routes/storeRouter');

//creating server
const app = express();

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// 1) GLOBAL MIDDLEWARE

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES

//api
app.use('/taxes', taxesRouter);
app.use('/licenses', licenseRouter);
app.use('/games', gameRouter);
app.use('/reviews', reviewRouter);
app.use('/stores', storeRouter);

app.use(globalErrorHandler);

//404 handler
app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

//Export server
module.exports = app;
