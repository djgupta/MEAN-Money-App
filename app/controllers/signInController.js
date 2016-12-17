mainApp.controller('signInController', function($scope, $http, $window, AppService, signInService){
	signInService.update({user: ''});
	$scope.log = "Register";
	$scope.isSignIn = false;
	$scope.isSignError = false;
	$scope.isRegisterError = false;
	$scope.user = {};

	$scope.logFunc = function(logVar){
		if(logVar== "Register"){
			$scope.log = logVar;
			$scope.isSignIn = false;
			$scope.isSignError = false;
			$scope.isRegisterError = false;
			$scope.user = {};
		}
		if(logVar== "SignIn"){
			$scope.log = logVar;
			$scope.isSignIn = true;
			$scope.isSignError = false;
			$scope.isRegisterError = false;
			$scope.user = {};
		}
	};

	$scope.logDB = function(){
		if($scope.log== "Register"){
			AppService.addUser($scope.user).then(function(data){
				$scope.isSignError = false;
				$scope.isRegisterError = false;
				signInService.update(data);
				$window.location.href = '#/home';
			},
			function(data){
				$scope.isSignError = false;
				$scope.isRegisterError = true;
				console.log("error" + data);
			});
		}
		if($scope.log== "SignIn"){
			AppService.signInUser($scope.user.Email, $scope.user.Password).then(function(data){
				$scope.isSignError = false;
				$scope.isRegisterError = false;
				signInService.update(data);
				$window.location.href = '#/home';
			},
			
			function(data){
				$scope.isRegisterError = false;
				$scope.isSignError = true;
				console.log("error" + data);
			});
		}
	};
});