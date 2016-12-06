/**
 * Created by shraddha on 11/16/16.
 */
module.exports = function(){
    var mongoose = require("mongoose");
   // var PageSchema = require("../page/page.schema.server")();
    var WebsiteSchema = mongoose.Schema({
        name: {type: String, required: true},
        description: String,
        dateCreated: {type: Date, default: Date.now()},
       // dateCreated: {type: new Date(), default: Date.now()},
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}]
    });

    return WebsiteSchema;
};