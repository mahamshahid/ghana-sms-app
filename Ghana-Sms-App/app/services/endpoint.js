(function() {

'use strict';
angular.module('GhanaSmsApp')
	.service('EndpointCallService', ['$http', '$window', EndpointCallService]);

	function EndpointCallService($http, $window) {

		var configModel = {
			baseUrl: '',
			port: ''
		};

		return {
			callEndpoint: function(options) {
				return $http(options);
			},

			setConfiguration: function() {
				return $http.get("../../config.json").then(function(response) {
					configModel.baseUrl = response.data.baseUrl;
					configModel.port = response.data.backendPort;
					// $window.localStorage.setItem('baseUrl', response.data.baseUrl);
					// $window.localStorage.setItem('port', response.data.backendPort);
				}, function(err) {
					console.log(err);
				});
			},

			getUrl: function() {
				console.log(configModel.baseUrl);
				console.log(configModel.port);
				return "http://" +
					configModel.baseUrl +
					":" +
					configModel.port;
			}
		}
	}
	
})();