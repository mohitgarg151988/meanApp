/**
 * Created by mohitgupta on 12/7/17.
 */
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('config');
var dbConfig = config.get('test.dbConfig');
var db = require('./db')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.all('/*', function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    if (request.method == 'OPTIONS') {
        response.status(200).end();
    } else {
        next();
    }
});

app.use('/', require('./controllers/employee.js'));
app.use('/users', require('./controllers/user.js'));

app.use(function (error, request, response, next) {
    console.error(error.stack);
    response.status(400).send(error.message);
});

app.set('port', process.env.PORT || 5001);

// Connect to Mongo on start and strat the server
db.connect(dbConfig.dbType+'://'+dbConfig.host+':'+dbConfig.port+'/'+dbConfig.dbName, function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.')
        process.exit(1)
    } else {
        var server = app.listen(app.get('port'), function() {
            console.log('Node server listening on port ' + server.address().port + ".");
        });
    }
})