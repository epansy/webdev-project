
module.exports = function(mongoose){

    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        username : {type : String, required : true},
        password : {type : String, required : true},
        firstName : String,
        lastName : String,

        roles: [{type: String,
            default: 'USER',
            enum: ['USER', 'ADMIN']}],

        email : String,
        phone : String,
        dateCreated : {
            type : Date,
            default: Date.now
        },
        // facebook: {
        //     id:    String,
        //     token: String
        // }
        google: {
            id: String,
            token: String
        }
    }, {collection: 'user'});

    return userSchema;
};
