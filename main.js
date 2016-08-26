var express    = require("express");
var favicon    = require("serve-favicon");
var mongoose   = require("mongoose");
var bodyParser = require("body-parser");

var configDB = require('./config/database');

mongoose.connect(configDB.url);
mongoose.connection.on('error', function() {
   console.log("Error: Connection to mongoose threw an error.");
   process.exit(1);
});

var app     = express();
var index   = require('./routes/index');
var admin   = require('./routes/admin');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended : false } ));

app.set('port', ( process.env.PORT || 1111 ));
app.use(express.static( __dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use('/', index);
app.use('/admin', admin);

app.listen(app.get('port'), function() {
   console.log("ShaneKent.com - Node app is running on port", app.get('port'));
});
