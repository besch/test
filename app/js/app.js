angular.module('Login', [])

	.controller('Main', function($scope, $http) {

		$scope.serverResponse = '';

		$scope.submitData = function(e) {
			e.preventDefault();
			$http({method: 'POST', url: '/url/api', params: {
				email: $scope.user.email,
				password: $scope.user.pass	
			}}).
	    success(function(data, status, headers, config) {
	    	$scope.serverResponse = 'Logowanie poprawne';
	    	$('form').css('display', 'node');
	    }).
	    error(function(data, status, headers, config) {
	    	switch(status) {
	    		case 401:
	    			$scope.serverResponse = 'niepoprawne login lub hasło';
	    			break;
	    		case 400:
	    			$scope.serverResponse = 'niepoprawne dane';
	    			break;
	    		case 500:
	    			$scope.serverResponse = 'błąd usługi';
	    			return
	    		default:
						$scope.serverResponse = 'niepoprawne dane lub inny błąd'
	    	}
	    });
		};
	})

	.directive('checkPassword', function() {
		return {
			require: 'ngModel',
			link: function(scope, el, attr, ctrl) {
				ctrl.$parsers.unshift(function(viewValue) {
					ctrl.$setValidity('oneDigit', true);
					ctrl.$setValidity('oneCapital', true);
					ctrl.$setValidity('sixChars', true);

					if(!/d/.test(viewValue)) {
						ctrl.$setValidity('oneDigit', false);
						return;
					}
					else if(!/[A-Z]/.test(viewValue)) {
						ctrl.$setValidity('oneCapital', false);
						return;
					}
					else if(viewValue.length <= 6) {
						ctrl.$setValidity('sixChars', false);
						return;
					}
				});
			}
		};
	});
