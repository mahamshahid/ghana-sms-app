(function() {

	'use strict';

	var app = angular.module('GhanaSmsApp', ['ngRoute', 'angularMoment']);

	app.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'login-template.html',
				controller: 'LoginController'
			})
			.when('/dashboard', {
				templateUrl: 'dashboard-template.html',
				controller: 'DashboardController'
			})
			.when('/messages', {
				templateUrl: 'message-template.html',
				controller: 'MessagesController'
			})
			.when('/news_events', {
				templateUrl: 'event_news-template.html',
				controller: 'NewsEventsController'
			})
			.otherwise({
				redirectTo: '/'
			})
	});
	
})();