module.exports = function(db) {

	var mongoose = require('mongoose');
	mongoose.createConnection('mongodb://localhost/' + db);

	return mongoose;

}