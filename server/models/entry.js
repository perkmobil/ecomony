var mongoose = require('mongoose');

module.exports = mongoose.model('Entry', {
	description: String,
	amount: Number,
	type: String,
	startDate: Date,
	endDate: Date,
	userId: String,
	frequency: String
});
