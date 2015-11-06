
	var app= angular.module('profile',[]);
	
	app.controller('statusController',function($scope){
		$scope.status={};
		$scope.date=new Date();
		$scope.age={};
	});
	app.controller('boxController',function($scope){
		$scope.edit=function() {
	        $scope.myVar = false;
	    };
	    $scope.display=function() {
	        $scope.myVar = true;
	    };
	});
