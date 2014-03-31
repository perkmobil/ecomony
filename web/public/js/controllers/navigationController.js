app.controller('NavigationController', ['$scope', '$location', function($scope, $location) {
	$scope.isActive = function (menuItem) {
		var a = '/' + menuItem.name;
		var b = $location.path();
		return a == b;
	};
	
	$scope.toggleNavigation = function() {
		if($scope.showNavigation) {
			$scope.showNavigation = false;
		} else {
			$scope.showNavigation = true;
		}
	};
	
	$scope.menuItems = [{name:'budget', label: 'Budget'},
	                {name:'costs', label: 'Costs'},
	                {name:'administration', label: 'Administration'}];
	
	$scope.navigationChanged = function(menuItem) {
		$scope.showNavigation = false;
		$scope.pageTitle = menuItem.label;
	};
	
}])
.directive('navigationComponent', function() {
	return {
		restrict: 'E',
		templateUrl: 'templates/navigation.html'
	};
});