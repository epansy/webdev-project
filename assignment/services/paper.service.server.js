var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');


module.exports = function(app, models){

    var model = models.paperModel;

    app.post('/api/submitPaper/:uid', submitPaper);
    app.get('/api/getPaperList/:uid', getPaperList);
    app.get('/api/getPaperById/:pid', getPaperById);
    app.post('/api/updatePaper/:pid', updatePaper);
    app.get('/api/deletePaper/:pid', deletePaper);
	/*
	app.get('/api/getQuestionList/:uid', getQuestionList);
    app.get('/api/getQuestionById/:qid', getQuestionById);
    app.get('/api/deleteQuestion/:qid', deleteQuestion);
	app.post('/api/updateQuestion/:qid', updateQuestion);
	*/
    /*API implementation*/

    function submitPaper(req, res) {

        var paper = req.body;
		var uid = req.params.uid;
		//console.log(uid);
        model
            .savePaper(paper)
            .then(
                function (newQ) {
                    res.json(newQ);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );

    }
    function getPaperList(req, res){
		var uid = req.params.uid;
		//console.log(uid);
        model
            .findAllPaper(uid)
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
    function getPaperById(req, res){
		var pid = req.params.pid;
		console.log(pid);
        model
            .findPaperById(pid)
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
    function updatePaper(req, res){
		var pid = req.params.pid;
        var paper = req.body;
		if(pid){
            model
                .updatePaper(pid,paper)
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
    function deletePaper(req, res){
		//console.log(uid);
        var pid = req.params.pid;
        if(pid){
            model
                .deletePaper(pid)
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
	/*
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
	*/

};
