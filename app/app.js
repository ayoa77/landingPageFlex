const express = require("express");
const fs = require("fs");
const https = require("https");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const mongoSanitize = require("mongo-express-sanitize");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

// const flash = require("connect-flash");
// const sm = require('sitemap');
const session = require("express-session");
// const bcrypt = require("bcryptjs");
const ejs = require("ejs");
const ejsLint = require("ejs-lint");
const ejsMate = require('ejs-mate');
// const morgan = require("morgan");
// require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();

// var sitemap = sm.createSitemap ({
//       hostname: 'http://flexPage.com',
//       cacheTime: 600000,        // 600 sec - cache purge period
//       urls: [
//         { url: '/',  changefreq: 'monthly', priority: 1.0 }
//       ]
//     });

// app.get('/sitemap.xml', function(req, res) {
//   sitemap.toXML( function (err, xml) {
//       if (err) {
//         return res.status(500).end();
//       }
//       res.header('Content-Type', 'application/xml');
//       res.send( xml );
//   });
// });
app.options("*", cors());
app.use(helmet());
// app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(mongoSanitize({
//     replaceWith: '_'
// }))
// app.use(mongoSanitize());
// MODELS
fs.readdirSync(__dirname + "/models").forEach(function(filename) {
  if (~filename.indexOf(".js")) require(__dirname + "/models/" + filename);
});

app.get("/robots.txt", function(req, res) {
  res.type("text/plain");
  res.send("\nDisallow:*");
});

app.engine('ejs', ejsMate);
app.locals._layoutFile = 'layout';
app.set("view engine", "ejs");
// app.use(ejsLint)
app.set("views", __dirname + "/views");
app.use("/", express.static(__dirname + "/public"));

// SESSIONS

// var userSchema = mongoose.model('user',userSchema);
// app.use(
//   sessions({
//     cookieName: "session",
//     secret: "supersekretSupersafe!",
//     duration: 7 * 24 * 60 * 60 * 1000, // maybe we should create another one for shopping carts?
//     activeDuration: 5 * 60 * 1000,
//     httpOnly: true, // don't let browser JS access cookie ever
//     // secure: true, // only use cookies over https
//     ephemeral: true // delete this cookie when the browser is closed
//   })
// );

// app.use(
//   sessions({
//     cookieName: "localeCookie",
//     secret: "supersekretSupersafe!",
//     duration: 7 * 24 * 60 * 60 * 1000, // maybe we should create another one for shopping carts?
//     activeDuration: 5 * 60 * 1000,
//     httpOnly: true, // don't let browser JS access cookie ever
//     // secure: true, // only use cookies over https
//     ephemeral: false // delete this cookie when the browser is closed
//   })
// );

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret:
      "thisISflexsLANDINGpageCOOKIEsuperfragilistexpialidociousOFaSecret123412341234",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true
    }
  })
);

// const userPersistMiddleware = require("./middleware/userPersistMiddleware");
// app.use(userPersistMiddleware);

// var geolocator = require("geolocator");
// geolocator.config({
//   language: "en" || lang,
//   google: {
//     version: "3",

//   },
//   https: true
//   // styles: []
// });

// fs.readdirSync(__dirname + '/routes').forEach(function(filename){
//   filename = filename.slice(0, -3);
//   console.log(filename)
//   filename = require('./routes/' + filename + '.js');
//   app.use('/', filename);
// });

// app.use(flash());
//===============//
// PASSING VARIABLES TO ejs
app.use(function varsForejs(req, res, next) {
  req.res.locals.moment = require("moment");
  // req.
  // res.locals.geoLocate = geolocator;
  // String(moment().format('YYYY/MM/DD hh:mm'))
  // res.locals._flashMessage = req.flash('message');
  // res.locals._flashError = req.flash('error');
  next();
});

// allpayPaymentRoutes = require("./routes/allpayPaymentRoutes");
// paypalPaymentRoutes = require("./routes/paypalPaymentRoutes");
// allRoutes = require("./routes/allRoutes");
// devRoutes = require("./routes/devRoutes");
indexRoute = require("./routes/indexRoute");

// Routes
// app.options('*', cors())
// app.use("/allpay", allpayPaymentRoutes);
// app.use("/paypal", paypalPaymentRoutes);
app.use("/", indexRoute.get_index);
// app.use("/:lang(zh|en)/dev", devRoutes);

app.use(function(req, res, next) {
  res.status(404).send(" 404: Sorry there is no page found here.");
});

// ADD MORE ENVIRONMENTS BELOW !
if ("development" == app.get("env")) {
  console.log("you are running in dev mode");
  // mongoose.connect('mongodb://smc:smc123@localhost/smartmycity?authSource=smartmycity')
  mongoose.connect("mongodb://127.0.0.1:27017/flexPage?socketTimeoutMS=100000",  { useNewUrlParser: true,useUnifiedTopology: true });
  app.locals.pretty = true;
} else if ("production") {
  console.log("you are running in production");
  // mongoose.connect('mongodb://localhostsmc:smc123@localhost/smartmycity?authSource=smartmycity')
  mongoose.connect("mongodb://127.0.0.1:27017/flexPage?socketTimeoutMS=100000",  { useNewUrlParser: true,useUnifiedTopology: true });
}

//for my https :)
// var certOptions = {
//   key: fs.readFileSync(path.resolve('/Users/ayoamadi/server.key')),
//   cert: fs.readFileSync(path.resolve('/Users/ayoamadi/server.crt'))
// }

// app.get("/", (req, res, next) => {
//   next();
// });

app.listen(8000, function(req, res) {
  console.log("listening on port 8000");
});

// function archive_all(testOnly) {
//   messages = $("._5blh");
//   var messageLength = messages.length;
//   console.log("Found", messageLength, "messages on messenger.");

//   for (i = 0; i < messageLength; i++) {
//     console.log(
//       "Archiving",
//       i + 1,
//       "out of",
//       messageLength,
//       "messages on messenger."
//     );
//     try {
//       if (!testOnly) {
//         messages[i].click(); // open dialog
//         $("li:contains('Archive')")
//           .last()
//           .click();
//       }
//     } catch (TypeError) {
//       console.log("TypeError");
//     }
//   }
//   if (testOnly)
//     console.log("Successfully tested archiving all of your facebook messages ");
//   else console.log("Successfully archived all of your facebook messages ");
// }

// function archive_all(testOnly) {
//   messages = $("._5blh");
//   var messageLength = messages.length;
//   console.log("Found", messageLength, "messages on messsenger.");
//   if (!testOnly) {
//     for (i = 0; i < messageLength; i++) {
//       console.log(
//         "Still Have",
//         messageLength - i,
//         "out of",
//         messageLength,
//         "messages on messsenger to be archived."
//       );
//       try {
//         messages[i].click(); // open dialog
//         $("li:contains('Archive')")
//           .last()
//           .click();
//       } catch (TypeError) {
//         console.log("TypeError");
//       }
//     }
//   }
// }

app.get("/robots.txt", function(req, res) {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: /");
});
