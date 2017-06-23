(function() {

'use strict';
angular.module('GhanaSmsApp')
	.controller('BaseController', ['$scope',
		'UserDataService',
		'EndpointCallService',
		BaseController
	]);

	function BaseController($scope, UserDataService, EndpointCallService) {

		var loginDetails = UserDataService.getLoginDetails();
		if(loginDetails.loginId === undefined
			|| loginDetails.loginId === null
			|| loginDetails.loginId === '') {
			console.log('User not logged in');
		} else {
			$scope.logout = function() {
				var config = {
					method: 'DELETE',
					url: 'http://localhost:3000/login/' + UserDataService.getLoginDetails().loginId,
					headers: {
						'Content-Type': 'application/json'
					}
				};
				if(loginDetails.loginId !== undefined
					&& loginDetails.loginId !== null
					&& loginDetails.loginId !== '') {
					console.log(config);
					var promise = EndpointCallService.callEndpoint(config);
					promise.then(function(success) {
						UserDataService.clearLoginDetails();
						UserDataService.clearUserName();
						UserDataService.clearDefaultAdminName();
						console.log('logged out');
						window.location.href = "#!/";
					}, function(error) {
						console.log(error);
					});
				}
			}
		}

	}
	
})();