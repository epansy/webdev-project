
module.exports = function(app){

    var mongoose = require('mongoose');

    var models = require("./model/models.server.js")(mongoose);

    require("./services/user.service.server.js")(app, models);
    require("./services/question.service.server.js")(app, models);
	require("./services/paper.service.server.js")(app, models);
};

console.log("server side app.js is running");