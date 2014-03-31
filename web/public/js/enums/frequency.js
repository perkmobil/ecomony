app.service('Frequency', function() {
	var self = this; // Save reference

	self.enum = {
		YEARLY : "Yearly",
		QUARTERLY : "Quaterly",
		MONTHLY : "Monthly",
		WEEKLY : "Weekly",
		DAILY : "Daily"
	};

	self.list = function() {
		return Object.keys(self.enum);
	};

	self.getString = function(type) {
		return self.enum[type];
	};
});
