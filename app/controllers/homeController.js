mainApp.controller('homeController', ['$scope', '$uibModal','AppService', 'signInService', function($scope, $uibModal, AppService, signInService){

	$scope.incoming = 0;
	$scope.outgoing = 0;
	$scope.total = 0;

	$scope.addExpensePopup = function(){
    	var modalInstanceExpense = $uibModal.open({
	      templateUrl: 'app/pages/addExpense.html',
	      controller: 'addExpenseController',
	      resolve: {
	      	parametersExpense: function(){
	      		return { 
	      			user: $scope.user
	      		};
	      	}
	      }
    	});

	    modalInstanceExpense.result.then(function (data) {
	    	updateUserDetails(data._id, data);
	    }, function () {
	    	getUserDetails(signInService.data.user.Email);
	      	console.log('Modal dismissed at: ' + new Date());
	    });
    };

    var expense = function(){
		var expense = {
			incoming:0,
			outgoing:0
		}
		var userInfo = $scope.user;
		if(userInfo != null && userInfo.Groups != null){
			for(var i=0; i< userInfo.Groups.length; i++){
				if(userInfo.Groups[i].GroupMembers != null){
					for(var j=0; j< userInfo.Groups[i].GroupMembers.length; j++){
						if(userInfo.Groups[i].GroupMembers[j].MemberExpense != null){
							for(var k=0; k< userInfo.Groups[i].GroupMembers[j].MemberExpense.length; k++){
								if(userInfo.Groups[i].GroupMembers[j].MemberExpense[k].ExpenseAmount > 0){
									expense.incoming += userInfo.Groups[i].GroupMembers[j].MemberExpense[k].ExpenseAmount;
								}
								else{
									expense.outgoing += userInfo.Groups[i].GroupMembers[j].MemberExpense[k].ExpenseAmount;
								}
							}
						}
						else{
							break;
						}
					}
				}
				else{
					break;
				}
			}
		}
		$scope.incoming = expense.incoming;
		$scope.outgoing = expense.outgoing;
	}

    var getUserDetails = function(email){
    	if(email == null){
    		return;
    	}
		AppService.getUserDetails(email).then(function(data){
	    	$scope.user = data;
	    	if(data.Groups != null){
	    		$scope.groupsList = data.Groups;
	    	}
	    	expense();
		},
		function(data){
			getUserDetails(signInService.data.user.Email);
			console.log("error" + data);
		});
	};

	var updateUserDetails = function(_id, user){
		AppService.updateUserDetails(_id, user).then(function(data){
	    		getUserDetails(data.Email)
	    	},
			
			function(data){
				console.log("error" + data);
			})
	};

	getUserDetails(signInService.data.user.Email);
}]);
