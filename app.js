require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors')



//Configs
require('./configs/db.config')
const passport      = require('passport');
require('./configs/passport.config');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


app.use(passport.initialize())
app.use(passport.session())


// default value for title local
app.locals.title = 'RestManager';

//CORS
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3001', 'http://localhost:3000']
}))


const index = require('./routes/index');
const adminRoutes = require('./routes/admin.routes')
const menuRoutes = require('./routes/menu.routes')
const authRoutes = require('./routes/auth.routes')
const cartRoutes = require('./routes/order.routes')
const configRoutes = require('./routes/config.routes')
app.use('/api', 
  index, 
  menuRoutes, 
  authRoutes,
  cartRoutes
  );
app.use('/api/admin', 
  adminRoutes,
  menuRoutes,
  configRoutes
  )


module.exports = app;
