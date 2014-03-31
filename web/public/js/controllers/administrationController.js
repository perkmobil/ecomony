app.controller('AdministrationController', [ '$scope', 'Entries', 'EntryType', 'Frequency',
function($scope, Entries, EntryType, Frequency) {
	$scope.frequencies = Frequency.list();
	$scope.entries = Entries.list();
	$scope.entryTypes = EntryType.list;
	$scope.entryTypeString = EntryType.getString;
	$scope.frequencyString = Frequency.getString;
	
	
	$scope.entryTypeChanged = function(type){
		$scope.currentEntry.type = type;
	};
			
	$scope.entrySelected = function(entry) {
		$scope.currentEntry = entry;
	};

	
	$scope.newEntry = function() {
		$scope.currentEntry = emptyEntry;
	};

	$scope.saveEntry = function() {
		if($scope.currentEntry._id) {
			Entries.update($scope.currentEntry, function(data) {
				$scope.entries = Entries.list();
			});
		} else {
			Entries.create($scope.currentEntry, function(data) {
				$scope.entries = Entries.list();
			});
		}
	};

	$scope.removeEntry = function() {
		Entries.remove({"id": $scope.currentEntry._id}, function(data) {
			$scope.currentEntry = emptyEntry;
			$scope.entries = Entries.list();
		});
	};

	var emptyEntry = {
		description : '',
		amount : 0,
		type : 'EXPENSE',
		startDate : null,
		endDate : null,
		userId : '',
		frequency : 'MONTHLY'
	};
} ]);
