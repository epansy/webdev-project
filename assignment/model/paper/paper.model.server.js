module.exports = function(mongoose){
    var paperSchema = require('./paper.schema.server.js')(mongoose);
    var paperModel = mongoose.model('paperModel', paperSchema);

    var api = {
        'savePaper' : savePaper,
        'findAllPaper' : findAllPaper,
        'findPaperById' : findPaperById,
        'updatePaper':updatePaper,
        'deletePaper':deletePaper
    };

    return api;

    // Function Definition Section

    function savePaper(paper){
        return paperModel.create(paper);
    }
    function  findAllPaper(uid){
        console.log(uid);
        return paperModel.find({uid:uid});
    }
    function findPaperById(pid){
        return paperModel.findOne({id:pid});
    }
    function updatePaper(pid,paper){
		return paperModel.update({
            id : pid
        }, {
            name: paper.name,
			questionIds: paper.questionIds
        });
	}
    function deletePaper(pid){
        return paperModel.remove({
            id : pid
        });
    }
};