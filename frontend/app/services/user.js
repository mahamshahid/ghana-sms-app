(function() {

'use strict';
angular.module('GhanaSmsApp')
	.service('UserDataService', ['$window', UserDataService]);

	function UserDataService($window) {
		var loggedInDetails = {
			userId: '',
			loginId: '',
			sessionId: ''
		};

		return {
			setLoginDetails: function(user_id, login_id, session_id) {
				$window.localStorage.setItem('user_id', user_id);
				$window.localStorage.setItem('login_id', login_id);
				$window.localStorage.setItem('session_id', session_id);
			},

			getLoginDetails: function() {
				loggedInDetails.userId = $window.localStorage.getItem('user_id');
				loggedInDetails.loginId = $window.localStorage.getItem('login_id');
				loggedInDetails.setItem = $window.localStorage.getItem('session_id');
				return loggedInDetails;
			},

			clearLoginDetails: function() {
				$window.localStorage.removeItem('user_id');
				$window.localStorage.removeItem('login_id');
				$window.localStorage.removeItem('session_id');
			},



			setUserName: function(user_name) {
				$window.localStorage.setItem('user_name', user_name);
			},

			getUserName: function() {
				return $window.localStorage.getItem('user_name');
			},

			clearUserName: function() {
				$window.localStorage.removeItem('user_name');
			},



			setDefaultAdminName: function(name) {
				$window.localStorage.setItem('admin', name);
			},

			getDefaultAdminName: function() {
				return $window.localStorage.getItem('admin');
			},

			clearDefaultAdminName: function() {
				$window.localStorage.removeItem('admin');
			}
		};
	}
	
})();