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
		
		$scope.login = function() {
			var config = {
				method: 'POST',
				url: 'http://localhost:3000/login',
				headers: {
					'Content-Type': 'application/json'
				},
				data: {
					cnic: $scope.loginModel.id,
					password: $scope.loginModel.pwd
				}
			};
			console.log(config);
			var promise = EndpointCallService.callEndpoint(config);
			promise.then(function(success) {
				console.log(success);
				UserDataService.setLoginDetails(config.data.cnic,
					success.data.loginId,
					success.data.currentSessionId);
				console.log(UserDataService.getLoginDetails());
				window.location.href = "#!/dashboard";
			}, function(error) {
				console.log(error);
			});
		}
	}
	
})();