(function() {

'use strict';
angular.module('GhanaSmsApp')
	.controller('MessagesController', ['$scope',
		'moment',
		'UserDataService',
		'EndpointCallService',
		MessagesController
	]);

	function MessagesController($scope, moment, UserDataService, EndpointCallService) {

		var loginDetails = UserDataService.getLoginDetails();
		if(loginDetails.loginId === undefined
			|| loginDetails.loginId === null
			|| loginDetails.loginId === '') {
			console.log('User not logged in');
			window.location.href = '#!/';
			return;
		}

		console.log($scope.opName);

		$scope.messages = [];
		$scope.categories = [];
		$scope.selectedItem = {};
		$scope.replyMessage = {
			senderPhoneNum: '',
			receiverPhoneNum: '',
			messageType: '',
			messageSubtype: '',
			messageCategory: '',
			body: '',
			sentAt: '',
			messageStatusId: ''
		};
		$scope.receivers = [];
		$scope.selectedReceiver = {
			phone: '',
			name: ''
		};
		$scope.newMessage = {
			messageCategory: '',
			body: ''
		};

		var confPromise = EndpointCallService.setConfiguration();

		confPromise.then(function(success) {

			function populateCategories() {
				console.log($scope.messages);
				$scope.messages.forEach(function(message) {
					if(message.messageCategory !== 'Uncategorized'
						&& $scope.categories.indexOf(message.messageCategory) < 0) {
						$scope.categories.push(message.messageCategory);
					}
				});
			};

			$scope.openMessage = function(index) {
				$scope.selectedItem = $scope.messages[index];
			};
			$scope.initReplyModel = function() {
				$scope.replyMessage.senderPhoneNum = $scope.selectedItem.receiverPhoneNum;
				$scope.replyMessage.receiverPhoneNum = $scope.selectedItem.senderPhoneNum;
				$scope.replyMessage.messageType = 2;
				$scope.replyMessage.messageSubtype = 2;
				$scope.replyMessage.messageCategory = $scope.selectedItem.messageCategory;
				$scope.replyMessage.sentAt = moment().format('YYYY-MM-DD HH:mm:ss');
				$scope.replyMessage.messageStatusId = 1;
				$scope.replyMessage.body = '';
			};
			$scope.sendReply = function() {
				console.log($scope.replyMessage);
				var config = {
					method: 'POST',
					url: EndpointCallService.getUrl() + '/messages',
					headers: {
						'Content-Type': 'application/json'
					},
					data: $scope.replyMessage
				};

				var promise = EndpointCallService.callEndpoint(config);
				promise.then(function(success) {
					var newMessage = $scope.replyMessage;
					newMessage.messageId = success.data;
					newMessage.senderName = $scope.selectedItem.receiverName;
					newMessage.receiverName = $scope.selectedItem.senderName;
					newMessage.receivedAt = '';
					$scope.messages.push(newMessage);
				}, function(err) {
					console.log(err);
				});
			};
			$scope.openAddModal = function() {
				var config = {
					method: 'GET',
					url: EndpointCallService.getUrl() + '/user/numbers',
					headers: {
						'Content-Type': 'application/json'
					}
				};
				var promise = EndpointCallService.callEndpoint(config);
				promise.then(function(success) {
					$scope.receivers = success.data;
				}, function(err){
					console.log(err);
				});
			};
			$scope.sendNewMessage = function() {
				var message = {
					senderPhoneNum: 0,
					receiverPhoneNum: $scope.selectedReceiver.phone,
					messageType: 2,
					messageSubtype: 1,
					messageCategory: $scope.newMessage.messageCategory,
					body: $scope.newMessage.body,
					sentAt: moment().format('YYYY-MM-DD HH:mm:ss'),
					messageStatusId: 1
				};
				var config = {
					method: 'POST',
					url: EndpointCallService.getUrl() + '/messages',
					headers: {
						'Content-Type': 'application/json'
					},
					data: message
				};
				var promise = EndpointCallService.callEndpoint(config);
				promise.then(function(success) {
					delete message.messageStatusId;
					message.messageId = success.data;
					message.senderName = UserDataService.getDefaultAdminName();
					message.receiverName = $scope.selectedReceiver.name;
					message.receivedAt = '';
					
					$scope.messages.push(message);
					angular.element('#addModal').modal('hide');
				}, function(err) {
					console.log(err);
				});
			};
			$scope.applyFilter = function() {
				console.log($scope.selectedFilter);
			};

			var config = {
				method: 'GET',
				url: EndpointCallService.getUrl() + '/messages',
				headers: {
					'Content-Type': 'application/json'
				}
			};

			var promise = EndpointCallService.callEndpoint(config);
			promise.then(function(success) {
				$scope.messages = success.data;
				populateCategories();
				$scope.openMessage(0);
			}, function(err){
				console.log(err);
			});
			console.log(UserDataService.getDefaultAdminName());

			$scope.$watch('selectedReceiver.phone', function(newValue, oldValue) {
				if(newValue !== oldValue) {
					$scope.receivers.forEach(function(receiver) {
						if(receiver.phone === newValue) {
							$scope.selectedReceiver.name = receiver.name;
						}
					});
				}
			});
		});

	}
	
})();