var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username })
  .then(function (user){
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  })
  .catch(function(err){
  return done(err)
  })
  })
  )

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var animalRouter = require('./routes/animals');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var animals = require("./models/animals");
var resourceRouter = require('./routes/resource');


async function recreateDB() {
  // Delete everything
  await animals.deleteMany();
  let instance1 = new
    animals({
      name: "Dogs",
        lifespan: "10 years",
        cost: 1000
    });
    let instance2 = new
    animals({
      name:"Cats",
      lifespan: "15 years",
      cost: 2000
    });
    let instance3 = new
    animals({
      name: "Goldfish",
      lifespan: "25 years",
      cost: 3000
    });

  instance1.save().then(doc => {
    console.log("First object saved")
  }
  ).catch(err => {
    console.error(err)
  });
  instance2.save().then(doc => {
    console.log("second object saved")
  }
  ).catch(err => {
    console.error(err)
  });
  instance3.save().then(doc => {
    console.log("third object saved")
  }
  ).catch(err => {
    console.error(err)
  });
}
let reseed = true;
if (reseed) { recreateDB(); }



require('dotenv').config();



var app = express();
const connectionString =
  process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString);

var Account =require('./models/accounts');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

var app = express();

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport config
// Use the existing connection
// The Account model
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function () {
  console.log("Connection to DB succeeded")
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/animals', animalRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/resource', resourceRouter);

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
