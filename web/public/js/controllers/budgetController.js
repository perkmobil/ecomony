app.controller('BudgetController', ['$scope', 'Entries', 'EntryType', function($scope, Entries, EntryType) {		
	var formatData = function(input) {
		Type = EntryType.enum;
		return _.map(input, function(entry) {
			var positive = {};
			var negative = {};
			if(entry.type === Type.INCOME) {
				positive = {x:0, y:entry.amount, description:entry.description, type:entry.type};
				negative = {x:1, y:0};
			} else {
				positive = {x:0, y:0, description:entry.description, type:entry.type};
				negative = {x:1, y:entry.amount};
			}
			
			return [positive, negative];
		});
	};
	
	Entries.list( function (entries) {
		var v = formatData(entries);
		$scope.data = v;
	});
}]);




