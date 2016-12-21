budgetControllers.controller('UserLoginCtrl', ['$scope', '$http', '$location', 'UserService',
	function UserLoginCtrl($scope, $http, $location, userSrv) {

		$scope.logIn = function(employee) {
			$http.post("http://localhost:4000/login", employee).success(function(data) {
	    		userSrv.isLogged = true;
				userSrv.user = {name:data.name,
                                role:data.role.toLowerCase()};
                console.log(data.name);
				if(data.role.toLowerCase()=="manager")
                    {
                        $location.path("/manager");
                    }
                else if(data.role.toLowerCase()=="techlead")
                    {
                        $location.path("/techLead");
                    }
                else{
                    $location.path("/developer");
                }
				
		    });
		};
	}
]);

budgetControllers.controller('UserRegisterCtrl', ['$scope', '$http', '$location', 'UserService',
	function UserRegisterCtrl($scope, $http, $location, userSrv) {
		$scope.register = function(employee) {
            console.log("register in client....................."+employee.employeename);
			if (employee.employeename != undefined && employee.password != undefined) {
                 console.log("before post....................."+employee.role);
				$http.post("http://localhost:4000/register",employee)
                    .success(function(data) {
                    console.log("after registering...................");
					$location.path("/login");
			    }).error(function()
                        {
                    console.log("error accoured in client");
                })
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


