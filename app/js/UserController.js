budgetControllers.controller('UserLoginCtrl', ['$scope', '$http', '$location', 'UserService',
	function UserLoginCtrl($scope, $http, $location, userSrv) {

		$scope.logIn = function(user) {
			$http.post("http://localhost:4000/login", employee).success(function(data) {
	    		userSrv.isLogged = true;
				userSrv.user = data;
				
				$location.path("/accounts");
		    });
		};
	}
]);

budgetControllers.controller('UserRegisterCtrl', ['$scope', '$http', '$location', 'UserService',
	function UserRegisterCtrl($scope, $http, $location, userSrv) {
		$scope.register = function(employee) {
            console.log("register in client....................."+employee.role);
			if (employee.username != undefined && employee.password != undefined) {
				$http.post("http://localhost:4000/register", employee).success(function(data) {
                    console.log("after registering...................");
					$location.path("/login");
			    });
			}
		};
	}
]);

budgetControllers.controller('UserLogoutCtrl', ['$scope', '$http', '$location', 'UserService',
	function UserLogoutCtrl($scope, $http, $location, userSrv) {

		$http.get("http://localhost:4000/logout", {withCredentials: true}).success(function(data) {
			userSrv.isLogged = false;
			userSrv.user = {};
			$location.path("/login");
	    });

	}
]);


