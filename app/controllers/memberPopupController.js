mainApp.controller('memberPopupController', function ($scope, $uibModalInstance, parametersMember) {

	$scope.member = parametersMember.member;

	$scope.close = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.save = function () {
		$uibModalInstance.close($scope.member);
	};
	
});