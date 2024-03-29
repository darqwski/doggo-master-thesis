const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var bodyParser = require('body-parser')

const pagesRouter = require('./routes/pages');
const authorizationRouter = require('./routes/authorization');
const registrationRouter = require('./routes/registration');
const createOfferRouter = require('./routes/offer/create-offer');
const getUserDogs = require('./routes/dogs/get-user-dogs');
const dogsForSale = require('./routes/dogs/dogs-for-sale');
const getActiveOffers = require('./routes/offer/get-active-offers');
const myOffers = require('./routes/offer/my-offers');
const activateOffer = require('./routes/offer/activate-offer');
const singleOffer = require('./routes/offer/single-offer');
const myDogs = require('./routes/dogs/my-dogs');
const paymentPage = require('./routes/payment/payment-page');
const getUserInfo = require('./routes/user/get-user-info');
const performPaymentProcess = require('./routes/payment/perform-payment-process');
const dogGallery = require('./routes/dogs/dog-gallery');
const profiles = require('./routes/profile/profile');
const admin = require('./routes/admin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser("SecretKey"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/img')));

app.use('/', pagesRouter);
app.use('/', authorizationRouter);
app.use('/', registrationRouter);
app.use('/', createOfferRouter);
app.use('/', dogsForSale);
app.use('/', getUserDogs);
app.use('/', getActiveOffers);
app.use('/', myOffers);
app.use('/', activateOffer);
app.use('/', singleOffer);
app.use('/', myDogs);
app.use('/', paymentPage);
app.use('/', getUserInfo);
app.use('/', performPaymentProcess);
app.use('/', dogGallery);
app.use('/', profiles);
app.use('/', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.render('error');
});

module.exports = app;
