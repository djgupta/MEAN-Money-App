mainApp.controller('groupsController', ['$scope', '$uibModal', 'AppService','signInService', function($scope,$uibModal, AppService, signInService) {

    $scope.groupsList = [];

    $scope.openGroupPopup = function(type, group){
    	var modalInstanceGroup = $uibModal.open({
	      templateUrl: 'app/pages/groupPopup.html',
	      controller: 'groupPopupController',
	      resolve: {
	      	parametersGroup: function(){
	      		return { 
	      			group: group
	      		};
	      	}
	      }
    	});

	    modalInstanceGroup.result.then(function (data) {
	    	if(type == "Add Group"){
	    		$scope.groupsList.push(data);
	    	}
	    	if(type == "Update Group"){
	    		var array = $scope.groupsList;
	    		if(array.indexOf(data) !== -1) {
		    		array[array.indexOf(data)] = data;
				}
				$scope.groupsList = array;
	    	}
	    	$scope.user.Groups = $scope.groupsList;
	    	updateUserDetails($scope.user._id, $scope.user);
	    }, function () {
	    		getUserDetails(signInService.data.user.Email);
	      		console.log('Modal dismissed at: ' + new Date());
	    });
    }

    $scope.delete = function(deleteGroup){
    	var array = $scope.groupsList;
		if(array.indexOf(deleteGroup) !== -1) {
		    array.splice(array.indexOf(deleteGroup), 1);
		}
		$scope.groupsList = array;
		$scope.user.Groups = $scope.groupsList;
	};

	var updateUserDetails = function(_id, user){
		AppService.updateUserDetails(_id, user).then(function(data){
	    		getUserDetails(data.Email)
	    	},
			
			function(data){
				console.log("error" + data);
			})
	};

	var getUserDetails = function(email){
		AppService.getUserDetails(email).then(function(data){
	    	$scope.user = data;
	    	if(data.Groups != null){
	    		$scope.groupsList = data.Groups;
	    	}
		},
		function(data){
			console.log("error" + data);
		});
	};

	getUserDetails(signInService.data.user.Email);
}]);