'use strict';

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const moment = require('moment');

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
});

app.listen(3000, function() {
	console.log('Server started listening on port 3000');
	// console.log(Date());
	// console.log(new Date().getTime());
	// // console.log(moment(Date()));
	// console.log(moment(Date.now()).toISOString());
	// console.log(moment(new Date()));
});

/*
 * MESSAGE ENDPOINTS
 */
app.route('/messages')
	.get(function getMessages(req, res) {
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
				TIMESTAMP(?),\
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
		const getMessageQuery = 'SELECT message_id AS messageId,\
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
		FROM `MESSAGES`\
		WHERE message_id = ?';
		const messageId = req.params.message_id;
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
			connection.query(getMessageQuery, messageId, queryHandler);
			connection.release();
		});
	})
	.delete(function deleteMessage(req, res) {
		const deleteMessageQuery = 'DELETE FROM `MESSAGES` WHERE message_id = ?';
		const messageId = req.params.message_id;
		const queryHandler = function (err, result) {
			if(err) {
				throw err
			} else {
				res.status(200);
			}
		}

		pool.getConnection(function(err, connection) {
			if(err) {
				throw err;
			}
			connection.query(deleteMessageQuery, messageId, queryHandler);
			connection.release();
		});
	});

/*
 * LOGIN ENDPOINTS
 */
app.route('/login')
	.post(function login(req, res) {
		const username = req.body.cnic;
		const pwd = req.body.password;
		// checking if credentials match from db
		const checkCredentialsQuery = 'SELECT count(cnic) AS userExists\
			FROM `users`\
			WHERE cnic = ? AND password = MD5(?)';
		const lastLoginQuery = 'SELECT last_login, last_update\
			FROM `login`\
			WHERE cnic = ?';
		const loginQuery = 'INSERT INTO `login` (cnic, last_login, last_update, created_on)\
			VALUES (?, TIMESTAMP(?), TIMESTAMP(?), TIMESTAMP(?))';
		const loginResponseQuery = 'SELECT login_id AS loginId,\
				current_session_id AS currentSessionId\
			FROM `login`\
			WHERE cnic = ?';
		const checkCredsValues = [username, pwd];
		const loginValues = [];
		const responseValues = [username];


		pool.getConnection(function(err, connection) {
			connection.query(checkCredentialsQuery, checkCredsValues, function(error, result) {
				if(result.userExist == 0) {
					// such user doesn't exist.
					const errorModel = {
						errorCode: 404,
						errorMessage: 'Username and/or Password is incorrect.',
						errorObject: error
					};
					console.log(errorModel);
					res.status(404);
					throw errorModel;
				} else {
					connection.query(lastLoginQuery, username, function(lastLoginError, lastLoginResult) {
						if(!lastLoginError) {
							let login = moment().format('YYYY-MM-DD HH:mm:ss');
							let update = moment().format('YYYY-MM-DD HH:mm:ss');
							if (lastLoginResult[0]) {
								login = lastLoginResult[0].last_login;
								update = lastLoginResult[0].last_update;
							}
							loginValues.push(username);
							loginValues.push(login);
							loginValues.push(update);
							loginValues.push(moment().format('YYYY-MM-DD HH:mm:ss'));
							console.log(loginValues);

							connection.query(loginQuery, loginValues, function(loginQueryError, loginQueryRes) {
								if(!loginQueryError) {
									connection.query(loginResponseQuery, responseValues, function(loginErr, loginResp) {
										if(!loginErr) {
											console.log(loginResp);
											res.status(204);
											res.json(loginResp);
										}
									});
								} else {
									throw loginQueryError;
									res.status(500);
									res.json(loginQueryError);
								}
							});
						}
					});
				}
			});
			connection.release();
		});
	})
	.put(function updatePassword(req, res) {
		const loginId = req.body.loginId;
		const newPwd = req.body.newPassword;
		const values = [newPwd, loginId];
		const updatePwdQuery = 'UPDATE `login` SET password = MD5(?) WHERE login_id = ?';

		const queryHandler = function (err, result) {
			if(err) {
				throw err
			} else {
				res.status(200);
				res.send();
			}
		}

		pool.getConnection(function(err, connection) {
			connection.query(updatePwdQuery, values, queryHandler);
			connection.release();
		});
	})
app.route('/login/:cnic')
	.get(function checkLogin(req, res) {
		const checkLoginQuery = 'SELECT COUNT(login_id) AS loggedIn,\
			login_id AS loginId\
		FROM login\
		WHERE cnic = ?';
		const value = req.params.cnic;

		const queryHandler = function (err, result) {
			if(err) {
				throw err
			} else {
				res.status(200);
				res.json(result);
			}
		}

		pool.getConnection(function(err, connection) {
			connection.query(checkLoginQuery, value, queryHandler);
			connection.release();
		});
	});
app.route('/login/:login_id')
	.delete(function logout(req, res) {
		const logoutQuery = 'DELETE FROM `login` WHERE login_id = ?';
		const value = req.body.login_id;

		const queryHandler = function (err, result) {
			if(err) {
				throw err
			} else {
				res.status(200);
			}
		}

		pool.getConnection(function(err, connection) {
			connection.query(logoutQuery, value, queryHandler);
			connection.release();
		});
	});


/*
 * REGISTER USER ENDPOINT
 */
app.route('/register')
	.post(function registerUser(req, res) {
		const username = req.body.cnic;
		const pwd = req.body.password;
		const name = req.body.full_name;
		const dob = req.body.date_of_birth;
		const phone = req.body.phone_number;
		const email = req.body.email;
		const updated = req.body.last_update;
		const created = req.body.created_on;
		const type = req.body.user_type;

		const registerQuery = 'INSERT INTO `users`\
			VALUES (?, ?, TIMESTAMP(?), ?, ?, TIMESTAMP(?), TIMESTAMP(?), ?, ?)';
		const values = [username, name, dob, phone, email, updated, created, pwd, type];
		const queryHandler = function (err, result) {
			if(err) {
				// query failed
				const errorModel = {
					errorCode: 500,
					errorMessage: 'Error executing the query on db',
					errorObject: err
				};
				console.log(errorModel);
			} else {
				console.log(result);
				res.status(204);
				res.send();
			}
		}

		pool.getConnection(function(err, connection) {
			if(err) {
				throw err;
			}
			connection.query(registerQuery, values, queryHandler);
			connection.release();
		});
	});



/*
 * EVENT/NEWS ENDPOINTS
 */
app.route('/event_news')
	.get(function getEventNews(req, res) {
		const eventQuery = 'SELECT event_id AS eventId,\
			event_title AS eventName,\
			event_body AS eventBody,\
			event_excerpt AS eventExcerpt,\
			event_type AS eventType\
		FROM events';

		const queryHandler = function (err, result) {
			if(err) {
				// query failed
				const errorModel = {
					errorCode: 500,
					errorMessage: 'Error executing the query on db',
					errorObject: err
				};
				console.log(errorModel);
			} else {
				console.log(result);
				res.status(200);
				res.json(result);
			}
		}

		pool.getConnection(function(err, connection) {
			if(err) {
				console.log(err);
			}
			connection.query(eventQuery, queryHandler);
			connection.release();
		});
	})
	.post(function addEventNews(req, res) {
		const addEventNewsQuery = 'INSERT INTO `events`(`event_title`, `event_excerpt`, `event_body`,\ `event_type`, `last_update`, `created_on`, `dispatch_status_id`, `event_user_id`)\
		VALUES (?, ?, ?, ?, TIMESTAMP(?), TIMESTAMP(?), ?, ?)';
		const values = [req.body.eventName, req.body.eventExcerpt, req.body.eventBody, req.body.eventType, req.body.lastUpdate, req.body.createdOn, req.body.dispatch, req.body.userId];

		const queryHandler = function (err, result) {
			if(err) {
				// query failed
				const errorModel = {
					errorCode: 500,
					errorMessage: 'Error executing the query on db',
					errorObject: err
				};
				console.log(errorModel);
			} else {
				console.log(result);
				res.status(204);
				res.send();
			}
		}

		pool.getConnection(function(err, connection) {
			if(err) {
				console.log(err);
			}
			connection.query(addEventNewsQuery, values, queryHandler);
			connection.release();
		});
	})
app.route('/event_news/:id')
	.put(function updateEventNews(req, res) {
		const updateQuery = 'UPDATE `events`\
			SET event_title = ?, event_body = ?, last_update = TIMESTAMP(?)\
			WHERE event_id = ?';
		const values = [req.body.eventTitle, req.body.eventBody, req.body.updatedAt, req.params.id];

		const queryHandler = function (err, result) {
			if(err) {
				// query failed
				const errorModel = {
					errorCode: 500,
					errorMessage: 'Error executing the query on db',
					errorObject: err
				};
				console.log(errorModel);
			} else {
				console.log(result);
				res.status(204);
				res.send();
			}
		}

		pool.getConnection(function(err, connection) {
			if(err) {
				console.log(err);
			}
			connection.query(updateQuery, values, queryHandler);
			connection.release();
		});
	})
	.delete(function deleteEventNews(req, res) {
		const deleteEventNewsQuery = 'DELETE from `events` WHERE event_id = ?';
		const value = req.params.id;

		const queryHandler = function (err, result) {
			if(err) {
				// query failed
				const errorModel = {
					errorCode: 500,
					errorMessage: 'Error executing the query on db',
					errorObject: err
				};
				console.log(errorModel);
			} else {
				console.log(result);
				res.status(204);
				res.send();
			}
		}

		pool.getConnection(function(err, connection) {
			if(err) {
				console.log(err);
			}
			connection.query(deleteEventNewsQuery, value, queryHandler);
			connection.release();
		});
	})

/*
 * DASHBOARD ENDPOINT
 */
app.route('/dashboard')
	.post(function dashboard(req, res) {
		const dashboardQuery = 'SELECT COUNT(message_id) AS messageCount,\
			(SELECT COUNT(event_id)\
				FROM events\
				WHERE dispatch_status_id = ?\
				AND event_user_id = ?\
				AND event_type = ?)\
			AS eventsCount,\
			(SELECT COUNT(event_id)\
				FROM events\
				WHERE dispatch_status_id = ?\
				AND event_user_id = ?\
				AND event_type = ?)\
			AS newsCount\
		FROM messages\
		WHERE receiver_user_id = ?\
		AND message_status_id = ?\
		AND message_type_id = ?\
		AND message_subtype_id = ?';
		const values = [2, loggedInDetails.userId, 0, 2, loggedInDetails.userId, 1, loggedInDetails.userId, 2, 1, 1 ];

		const queryHandler = function (err, result) {
			if(err) {
				// query failed
				const errorModel = {
					errorCode: 500,
					errorMessage: 'Error executing the query on db',
					errorObject: err
				};
				console.log(errorModel);
			} else {
				console.log(result);
				res.status(200);
				res.json(result);
			}
		}

		pool.getConnection(function(err, connection) {
			if(err) {
				console.log(err);
			}
			connection.query(dashboardQuery, values, queryHandler);
			connection.release();
		});
	})
