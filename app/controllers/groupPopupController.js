mainApp.controller('groupPopupController', function ($scope, $uibModal, $uibModalInstance, parametersGroup, signInService, AppService) {
	$scope.group = parametersGroup.group;
	if(parametersGroup.group.GroupMembers == null){
		$scope.group.GroupMembers = [];
	}
	$scope.openMemberPopup = function(type, member){
    	var modalInstanceMember = $uibModal.open({
	      templateUrl: 'app/pages/memberPopup.html',
	      controller: 'memberPopupController',
	      resolve: {
	      	parametersMember: function(){
	      		return { 
	      			member: member,
	      		};
	      	}
	      }
    	});

	    modalInstanceMember.result.then(function (data) {
	    	if(type == "Add Member"){
	    		$scope.group.GroupMembers.push(data);
	    	}
	    	if(type == "Update Member"){
	    		var array = $scope.group.GroupMembers;
	    		if(array.indexOf(data) !== -1) {
		    		array[array.indexOf(data)] = data;
				}
				$scope.group.GroupMembers = array;
	    	}
	    }, function () {
	    		console.log('Modal dismissed at: ' + new Date());
	    });
    }

    $scope.memberDelete = function(deleteMember){
    	var array = $scope.group.GroupMembers;
		if(array.indexOf(deleteMember) !== -1) {
		    array.splice(array.indexOf(deleteMember), 1);
		}
		$scope.group.GroupMembers = array;
	};

	$scope.sumExpense = function(memberExpense){
		var sum = 0;
		if(memberExpense != null){
			for(var i=0; i<memberExpense.length; i++){
				sum += memberExpense[i].ExpenseAmount;
			}
		}
		return sum;
	}

	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.save = function () {
		$uibModalInstance.close($scope.group);
	};
	
	var getUserDetails = function(email){
		AppService.getUserDetails(email).then(function(data){
	    	$scope.group = data.Group;
	    	if(data.Groups != null){
	    		$scope.groupsList = data.Groups;
	    	}
		},
		function(data){
			console.log("error" + data);
		});
	};

});