/**
 * Created by shraddha on 11/16/16.
 */
module.exports = function()
{
    var mongoose = require("mongoose");
    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
        name: {type: String, required: true},
        title: String,

        dateCreated: {type: Date, default: Date.now()},
       // dateCreated: {type: new Date(), default: Date.now()},
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}]
    });

    return PageSchema;
}