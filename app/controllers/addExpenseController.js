mainApp.controller('addExpenseController', function ($scope, $uibModal, $uibModalInstance, parametersExpense) {
	
	$scope.expense = {};
	$scope.user = parametersExpense.user;
	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.save = function () {
		var userInfo = $scope.user;
		for(var i=0; i< userInfo.Groups.length; i++){
			if(userInfo.Groups[i].GroupName == $scope.expense.Group.GroupName){
				for(var j=0; j< userInfo.Groups[i].GroupMembers.length; j++){
					if(userInfo.Groups[i].GroupMembers[j].MemberName == $scope.expense.Member.MemberName){
						userInfo.Groups[i].GroupMembers[j].MemberExpense.push({
							ExpenseAmount: $scope.expense.ExpenseAmount,
							ExpenseType: $scope.expense.ExpenseType
						});
						break;
					}
				}
				$scope.user = userInfo;
				break;
			}
		}
		$uibModalInstance.close($scope.user);
	};
});