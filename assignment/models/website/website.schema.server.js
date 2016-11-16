/**
 * Created by shraddha on 11/16/16.
 */
module.exports = function(){
    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({
        name: String,
        uid: String,
        description: String

    }, {collection: "website"});

    return WebsiteSchema;
};