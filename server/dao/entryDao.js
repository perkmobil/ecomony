var EntryModel = require('./../models/entry');
var _ = require('underscore');

module.exports = {
	update: function (entryInput, callback) {
		// Can not uppdate _id
		var entryId = entryInput._id;
		delete entryInput._id;

		EntryModel.update(
				{_id : entryId}, 
				entryInput, 
				{multi : true}, 
				callback);	
	},
		
	insert: function(entryInput, callback) {

		// Set startDate
		entryInput.startDate = new Date();
		var entry = new EntryModel(entryInput);

		entry.save(callback);
	},

	remove: function(id, callback) {
		EntryModel.findById(id, function (err, entry) {
		    entry.remove(callback);
		});
	},

	get: function(id, callback) {
		EntryModel.find({
			'_id' : req.params.id
		}, callback);
	},
	
	getAll: function(callback) {
		EntryModel.find({}, callback);
	}
};