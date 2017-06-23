(function() {

'use strict';
angular.module('GhanaSmsApp')
	.service('EndpointCallService', ['$http', EndpointCallService]);

	function EndpointCallService($http) {
		return {
			callEndpoint: function(options) {
				return $http(options);
			}
		}
	}
	
})();