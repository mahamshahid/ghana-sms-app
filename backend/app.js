'use strict';

const express = require('express');
const mysql = require('mysql');

const dbConnectConfig = {
	host: 'localhost',
	port: 3000,
	user: 'root',
	password: '',
	database: 'mydb'
};
const connection = mysql.createConnection(dbConnectConfig);

const app = express();
app.get('/', function(req, res) {
	console.log('page hit');
	connection.connect(function(err, success) {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			console.log(success);
			res.send(success);
		}
	});
});

app.listen(3000, function() {
	console.log('Server started listening on port 3000');
});
