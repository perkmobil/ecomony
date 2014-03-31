var EntryType = require('./../enums/entryType');
var EntryDao = require('./../dao/entryDao');
var _ = require('underscore');

var sortByType = function (entry) {
	if(entry.type === EntryType.INCOME) {
		return 1;
	} else if(entry.type === EntryType.SAVING) {
		return 2;
	} else {
		return 3;
	}
};

module.exports = function(app) {

	app.put('/entries/:id', function(req, res) {
		EntryDao.update(
				req.body, 
				function(err, insertedEntry) {
					res.send(insertedEntry);
				});
	});

	app.post('/entries', function(req, res) {

		var entryInput = req.body;

		EntryDao.insert(req.body, function(err, insertedEntry) {
			res.send(insertedEntry); 
		});
	});
	
	app.delete('/entries/:id', function(req, res) {
		EntryDao.remove(req.params.id, function (err) {
			if (!err) {
				return res.send('');
			} else {
				console.log(err);
			}
	    });
	});

	app.get('/entries/:id', function(req, res) {
		EntryDao.get(req.params.id, function(err, item) {
			if (err) {
				console.log('Failed to get entry');
			}
			res.send(item);
		});
	});
	
	app.get('/entries', function(req, res) {
		EntryDao.getAll(function(err, items) {
			if (!err) {
				items =_.sortBy(items, sortByType);
				res.send(items);
			} else {
				console.log('Failed to get entries');
				throw err;
			}
		});
	});
};