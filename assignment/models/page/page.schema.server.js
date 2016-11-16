/**
 * Created by shraddha on 11/16/16.
 */
module.exports = function()
{
    var mongoose = require("mongoose");
    var PageSchema = mongoose.Schema({
        name: String,
        wid: String,
        description: String
    }, {collection: "page"});

    return PageSchema;
}