var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');


module.exports = function(app, models){

    var model = models.questionModel;

    app.post('/api/submitQuestion/:uid', submitQuestion);
	app.get('/api/getQuestionList/:uid', getQuestionList);
    app.get('/api/getQuestionById/:qid', getQuestionById);
    app.get('/api/deleteQuestion/:qid', deleteQuestion);
	app.post('/api/updateQuestion/:qid', updateQuestion);

    /*API implementation*/

    function submitQuestion(req, res) {

        var question = req.body;
		var uid = req.params.uid;
		//console.log(uid);
        model
            .saveQuestion(question)
            .then(
                function (newQ) {
                    res.json(newQ);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );

    }
	function getQuestionById(req, res){
		var qid = req.params.qid;
		console.log(qid);
        model
            .findQuestionById(qid)
            .then(
                function (q) {
                    console.log("!!!!get!!!");
                    console.log(q);
                    res.json(q);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
	}
    function getQuestionList(req, res){
		var uid = req.params.uid;
		//console.log(uid);
        model
            .findAllQuestion(uid)
            .then(
                function (qs) {
                    //console.log("!!!!get!!!");
                    //console.log(qs);
                    res.json(qs);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
	}
    
    function deleteQuestion(req, res){
		//console.log(uid);
        var qid = req.params.qid;
        if(qid){
            model
                .deleteQuestion(qid)
                .then(
                    function (status){
                        res.sendStatus(200);
                    },
                    function (error){
                        res.sendStatus(400).send(error);
                    }
                );
        } else{
            // Precondition Failed. Precondition is that the user exists.
            res.sendStatus(412);
        }
	}
	function updateQuestion(req, res){
		var qid = req.params.qid;
        var question = req.body;
		if(qid){
            model
                .updateQuestion(qid,question)
                .then(
                    function (status){
                        res.sendStatus(200);
                    },
                    function (error){
                        res.sendStatus(400).send(error);
                    }
                );
        } else{
            // Precondition Failed. Precondition is that the user exists.
            res.sendStatus(412);
        }
	}

};
