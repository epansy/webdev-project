
module.exports = function(mongoose) {
    var connectionString =  null;

    if (process.env.MONGODB_URI) {
        connectionString = 'mongodb://admin:admin@ds025263.mlab.com:25263/heroku_ncvc4mrl';
    }
    else
    {
        connectionString = 'mongodb://localhost:27017/webdev-project-mindai'
    }

    mongoose.connect(connectionString, {
        useMongoClient: true
    });
    mongoose.Promise = require('q').Promise;

    var userModel = require("./user/user.model.server.js")(mongoose);
	var questionModel = require("./question/question.model.server.js")(mongoose);
	var paperModel = require("./paper/paper.model.server.js")(mongoose);
    var models = {
        'userModel' : userModel,
		'questionModel' : questionModel,
		'paperModel' : paperModel
    };

    return models;
};

console.log("models.server.js is running");

