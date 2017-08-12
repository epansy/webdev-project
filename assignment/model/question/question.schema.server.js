
module.exports = function(mongoose){

    var Schema = mongoose.Schema;

    var questionSchema = new Schema(
        {
			id: String,
			qtype: Number,
			name: String,
			content: String,
			options: Array,
			answer: String,
			uid: String
		}, {collection: 'question'});

    return questionSchema;
};
