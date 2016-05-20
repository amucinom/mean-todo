// set up
var express = require('express');
var app = express(); // create our app with express
var mongoose = require('mongoose'); // for mongodb
var morgan = require('morgan'); // log requests to the console
var bodyParser = require('body-parser'); // pull information from HTML POST
var methodOverride = require('method-override'); // simulate DELETE an PUT
var port = 8000;

// configuration

mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uw03mypu'); // connect to db on modulus

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// define model
var Todo = mongoose.model('Todo', {
	text: String
});

// routes
// api ---
// get all todos
app.get('/api/todos', function (req, res) {
	Todo.find( function (err, todos) {

		// if there is an error, send error, program will stop
		if (err) {
			res.send(err);
		} else {
			res.json(todos);
		}

	});
});

// create todo and send back all todos after creation
app.post('/api/todos', function (req, res) {

	// create a todo, info comes from AJAX request from Angular
	Todo.create({
		text: req.body.text,
		done: false
	}, function (err, todo) {
		if (err) {
			res.send(err);
		}
			Todo.find(function (err, todos) {
				if (err) {
					res.send(err);
				} else {
					res.json(todos);
				}
			});
	});
});

// delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err) {
                    res.send(err);
				}
                res.json(todos);
            });
        });
    });

	// listen
	app.listen(port);
	console.log('App listening on port ' + port);
