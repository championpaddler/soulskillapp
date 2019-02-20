const express = require('../node_modules/express'),
  path = require('../node_modules/path'),
  bodyParser = require('../node_modules/body-parser'),
  cors = require('../node_modules/cors'),
  mongoose = require('../node_modules/mongoose'),
  config = require('./DB');

const businessRoute = require('./routes/business.route');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/static/:id", function (req, res) {
  res.sendFile(path.join(__dirname + '/public/uploads/' + req.params.id))
});

app.use(express.static(__dirname + '/../dist/angular7crud'));

app.use('/business', businessRoute);

app.use('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/../dist/angular7crud/index.html'))
});

const port = process.env.PORT || 4000;

const server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});