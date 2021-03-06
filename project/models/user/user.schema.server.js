/**
 * Created by shraddha on 11/18/16.
 */
module.exports = function(mongoose){

    var UserSchema = mongoose.Schema({
        email: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        recipes: [{type: mongoose.Schema.Types.ObjectId, ref: "RecipeModel"}],
        type: {type: String, default: "project"},
        role: {type: String, enum: ['member', 'admin'], default: 'member'},
        inbox: {type: Array, default: [{firstName: "Chief Chef", message: "Hi! Welcome to Homestraunt! Here you can whip up state-of-the-art restaurant standard dishes at home. @automailNoReply",
        timeReceived: {type: Date, default: Date()}}]}
    }, {collection: "userProject"});

    return UserSchema;
}