(function() {

'use strict';
angular.module('GhanaSmsApp')
	.controller('NewsEventsController', ['$scope',
		'moment',
		'EndpointCallService',
		'UserDataService',
		NewsEventsController
	]);

	function NewsEventsController($scope, moment, EndpointCallService, UserDataService) {

		var loginDetails = UserDataService.getLoginDetails();
		if(loginDetails.loginId === undefined
			|| loginDetails.loginId === null
			|| loginDetails.loginId === '') {
			console.log('User not logged in');
			window.location.href = '#!/';
			return;
		}

		$scope.events = [];
		$scope.selectedItem = {
			id: '',
			title: '',
			body: '',
			excerpt: '',
			type: ''
		};
		$scope.newItem = {
			eventId: '',
			eventName: '',
			eventBody: '',
			eventExcerpt: '',
			eventType: ''
		};
		$scope.viewModal = false;
		$scope.updateModal = false;
		$scope.addModal = false;

		var config = {
			method: 'GET',
			url: 'http://localhost:3000/event_news',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		var pr = EndpointCallService.callEndpoint(config);
		pr.then(function(success) {
			console.log(success);
			$scope.events = success.data;
			console.log($scope.events);
		}, function(err) {
			console.log(err);
		});

		function getEventDetails(id) {
			console.log(id);
			var eventMatch = {};
			$scope.events.forEach(function(event) {
				if(event.eventId === id) {
					eventMatch = event;
				}	
			});
			return eventMatch;
		}

		function populateSelectedItem(id) {
			var event = getEventDetails(id);
			if(Object.keys(event).length > 0) {
				$scope.selectedItem.id = event.eventId;
				$scope.selectedItem.title = event.eventName;
				$scope.selectedItem.body = event.eventBody;
				$scope.selectedItem.excerpt = event.eventExcerpt;
				$scope.selectedItem.type = event.eventType;
				console.log($scope.selectedItem);
			}
		}

		$scope.viewItem = function(eventId) {
			populateSelectedItem(eventId);
			$scope.viewModal = true;
		}
		$scope.openUpdateModal = function(eventId) {
			populateSelectedItem(eventId);
			$scope.updateModal = true;
		}
		$scope.updateItem = function() {
			var event = getEventDetails($scope.selectedItem.id);
			var config = {
				method: 'PUT',
				url: 'http://localhost:3000/event_news/' + event.eventId,
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					eventTitle: $scope.selectedItem.title,
					eventBody: $scope.selectedItem.body,
					updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
				}
			};
			var promise = EndpointCallService.callEndpoint(config);
			promise.then(function(success) {
				console.log(success);
				event.eventName = $scope.selectedItem.title;
				event.eventBody = $scope.selectedItem.body;
				console.log($scope.events);
			});
		}
		$scope.addItem = function(type){
			$scope.newItem.eventName = '';
			$scope.newItem.eventBody = '';
			$scope.newItem.eventExcerpt = '';
			$scope.newItem.eventType = type;
		}
		$scope.addNewItem = function() {
			$scope.newItem.eventExcerpt = $scope.newItem.eventBody.split(".")[0];
			var config = {
				method: 'POST',
				url: 'http://localhost:3000/event_news/',
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					eventName: $scope.newItem.eventName,
					eventExcerpt: $scope.newItem.eventExcerpt,
					eventBody: $scope.newItem.eventBody,
					eventType: $scope.newItem.eventType,
					lastUpdate: moment().format('YYYY-MM-DD HH:mm:ss'),
					createdOn: moment().format('YYYY-MM-DD HH:mm:ss'),
					dispatch: 1,
					userId: loginDetails.userId
				}
			};
			
			var promise = EndpointCallService.callEndpoint(config);
			promise.then(function(data) {
				$scope.newItem.eventId = data;
				$scope.events.push($scope.newItem);
			}, function(err) {
				console.log(err);
			});
		}
	}
	
})();