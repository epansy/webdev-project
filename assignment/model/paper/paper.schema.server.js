
module.exports = function(mongoose){

    var Schema = mongoose.Schema;

    var paperSchema = new Schema(
        {
			id: String,
			name: String,
			questionIds: Array,
			uid: String
		}, {collection: 'paper'});

    return paperSchema;
};
