budgetControllers.controller('ManagerCtrl', ['$scope', '$http',
	function ManagerCtrl($scope, $http) {
        $scope.ifClicked=false;

		$http.get('http://localhost:4000/developers', {withCredentials: true}).success(function(data) {
	    	$scope.developers = data;
	    });
        
        $http.get('http://localhost:4000/techLeads', {withCredentials: true}).success(function(data) {
	    	$scope.techLeads = data;
	    });

	    $scope.createProject = function(project) {
	    	if (project === undefined || project.name == null) {
	    		return ;
	    	}


	    	//Save Category
	    	$http.post('http://localhost:4000/createProject', project, {withCredentials: true}).success(function(data) {
		    	$scope.project=data;
                $scope.ifClicked=true;
		    });
	    };

	    /*$scope.deleteCategory = function(categoryId) {
	    	$http.delete('http://localhost:4000/categories/' + categoryId, {withCredentials: true}).success(function(data) {
	    		var categories = $scope.categories;
		    	for (var categoryKey in categories) {
		    		if (categories[categoryKey]._id == categoryId) { 
		    			$scope.categories.splice(categoryKey, 1);
		    			return ;
		    		}
	    		}
		    });
	    };*/
	}
]);