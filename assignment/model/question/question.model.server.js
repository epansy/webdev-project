module.exports = function(mongoose){
    var questionSchema = require('./question.schema.server.js')(mongoose);
    var questionModel = mongoose.model('questionModel', questionSchema);

    var api = {
        'saveQuestion' : saveQuestion,
        'findAllQuestion':findAllQuestion,
        'findQuestionById':findQuestionById,
        'deleteQuestion':deleteQuestion,
		'updateQuestion':updateQuestion
    };

    return api;

    // Function Definition Section

    function saveQuestion(question){
		question.id = (new Date()).valueOf();
        return questionModel.create(question);
    }
    function  findAllQuestion(uid){
        console.log(uid);
        return questionModel.find({uid:uid});
    }
    function findQuestionById(qid){
        return questionModel.findOne({id:qid});
    }
    function deleteQuestion(qid){
        return questionModel.remove({
            id : qid
        });
    }
	function updateQuestion(qid,question){
		return questionModel.update({
            id : qid
        }, {
            qtype: question.qtype,
			name: question.name,
			content: question.content,
			options: question.options,
			answer: question.answer
        });
	}
};