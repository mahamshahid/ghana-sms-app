(function() {

'use strict';
angular.module('GhanaSmsApp')
	.controller('LoginController', ['$scope',
		'UserDataService',
		'EndpointCallService',
		LoginController
	]);

	function LoginController($scope, UserDataService, EndpointCallService) {

		var loginDetails = UserDataService.getLoginDetails();
		if(loginDetails.loginId !== undefined
			&& loginDetails.loginId !== null
			&& loginDetails.loginId !== '') {
			console.log('User logged in');
			window.location.href = '#!/dashboard';
			return;
		}

		$scope.loginModel = {
			id: '',
			pwd: ''
		};
		$scope.reset = {
			cnic: ''
		};
		
		var confPromise = EndpointCallService.setConfiguration();

		confPromise.then(function(success) {
			$scope.login = function() {
				var config = {
					method: 'POST',
					url: EndpointCallService.getUrl() + '/login',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						cnic: $scope.loginModel.id,
						password: $scope.loginModel.pwd
					}
				};
				var getUserNameConfig = {
					method: 'POST',
					url: EndpointCallService.getUrl() + '/user',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						user_id: $scope.loginModel.id,
					}
				}
				console.log(config);
				var promise = EndpointCallService.callEndpoint(config);
				var promise2 = EndpointCallService.callEndpoint(getUserNameConfig);
				promise.then(function(success) {
					console.log(success);
					UserDataService.setLoginDetails(config.data.cnic,
						success.data.loginId,
						success.data.currentSessionId);
					promise2.then(function(success) {
						UserDataService.setUserName(success.data.name);
					}, function(err) {
						console.log(err);
					});
					console.log(UserDataService.getLoginDetails());

					window.location.href = "#!/dashboard";
				}, function(error) {
					console.log(error);
				});
			}

			$scope.updatePassword = function() {
				var config = {
					method: 'POST',
					url: EndpointCallService.getUrl() + '/user/verify/cnic',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						cnic: $scope.reset.cnic,
					}
				};
				var configPwd = {
					method: 'PUT',
					url: EndpointCallService.getUrl() + '/user/password',
					headers: {
						'Content-Type': 'application/json'
					},
					data: {
						cnic: $scope.reset.cnic,
					}
				};
				var promise = EndpointCallService.callEndpoint(config);
				promise.then(function(success) {
					var pwdPromise = EndpointCallService.callEndpoint(configPwd);
					pwdPromise.then(function(success) {
						$scope.resultMessage = "Your new password is: " + success.data;
						console.log($scope.resultMessage);
					}, function(error) {
						$scope.resultMessage = "Error occurred trying to reset the password";
						console.log($scope.resultMessage);
					});
				}, function(err) {
					$scope.resultMessage = 'The user does not exist in the database';
					console.log($scope.resultMessage);
				});
			}
		});

	}
	
})();