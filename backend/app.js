'use strict';

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const dbConnectConfig = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'ghana',
	connectionLimit: 500
};
const pool = mysql.createPool(dbConnectConfig);

const app = express();
// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.send('Hello World!');
	// pool.getConnection(function (err, connection) {
	// 	if(err) {
	// 		console.log(err);
	// 		return;
	// 	}
	// 	let query = 'SELECT * FROM USERS';
	// 	connection.query(query, function(err, result, fields) {
	// 		if(!err) {
	// 			console.log(result);
	// 			res.json(result);
	// 			connection.release();
	// 		}
	// 	});
	// });
});

app.listen(3000, function() {
	console.log('Server started listening on port 3000');
});

app.route('/messages')
	.get(function getMessages(req, res) {
		// this can cause sql injection.
		// TODO: replace the values with ? and handle accordingly
		const getMessagesQuery = 'SELECT message_id AS messageId,\
				(SELECT full_name\
					FROM `USERS`\
					WHERE cnic = sender_user_id) AS senderName,\
				(SELECT full_name\
					FROM `USERS`\
					WHERE cnic = receiver_user_id) AS receiverName,\
				(SELECT phone_number\
					FROM `USERS`\
					WHERE cnic = sender_user_id) AS senderPhoneNum,\
				(SELECT phone_number\
					FROM `USERS`\
					WHERE cnic = receiver_user_id) AS receiverPhoneNum,\
				sent_at AS sentAt,\
				received_at AS receivedAt,\
				(SELECT message_type_name\
					FROM `MESSAGE_TYPE`\
					WHERE message_type_id = `MESSAGES`.message_type_id) AS messageType,\
				(SELECT message_subtype_name\
					FROM `MESSAGE_SUBTYPE`\
					WHERE message_subtype_id = `MESSAGES`.message_subtype_id) AS messageSubType,\
				message_body AS body\
			FROM `MESSAGES`';
		const queryHandler = function (err, result) {
			if(err) {
				throw err
			} else {
				res.status(200);
				res.json(result);
			}
		}

		pool.getConnection(function(err, connection) {
			if(err) {
				throw err;
			}
			connection.query(getMessagesQuery, queryHandler);
			connection.release();
		});
	})
	.post(function addMessage(req, res) {
		console.log(req.body.sentAt);
		const saveMessageQuery = 'INSERT INTO `MESSAGES` (`sender_user_id`,\
				receiver_user_id,\
				message_type_id,\
				message_subtype_id,\
				message_category,\
				message_body,\
				sent_at,\
				message_status_id)\
			VALUES ((SELECT cnic FROM `USERS` WHERE phone_number = ?),\
				(SELECT cnic FROM `USERS` WHERE phone_number = ?),\
				?,\
				?,\
				?,\
				?,\
				?,\
				?)';
		const valsArray = [req.body.senderPhoneNum,
			req.body.receiverPhoneNum,
			req.body.messageType,
			req.body.messageSubtype,
			req.body.messageCategory,
			req.body.body,
			req.body.sentAt,
			req.body.messageStatusId];
		const queryHandler = function (err, result) {
			if(err) {
				throw err
			} else {
				console.log('Message inserted...result: ' + JSON.stringify(result));
				res.status(200);
				res.json(result.insertId);
			}
		}

		pool.getConnection(function(err, connection) {
			if(err) {
				throw err;
			}
			connection.query(saveMessageQuery, valsArray, queryHandler);
			connection.release();
		});
	});

app.route('/messages/:message_id')
	.get(function getMessage(req, res) {

	})
	.delete(function deleteMessage(req, res) {

	});