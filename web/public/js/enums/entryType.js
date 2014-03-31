app.service('EntryType', function() {
	var self = this; // Save reference

	self.enum = {
		INCOME : 'INCOME',
		SAVING : 'SAVING',
		EXPENSE : 'EXPENSE',
	};

	self.list = function() {
		return Object.keys(self.enum);
	};

	self.getString = function(type) {
		if(!type) {
			return '';
		}
		return self.strings[type];
	};
	
	self.strings = {
		INCOME : "Income",
		SAVING : "Saving",
		EXPENSE : "Expense",
	};
});
