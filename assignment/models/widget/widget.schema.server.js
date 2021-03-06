/**
 * Created by shraddha on 11/26/16.
 */
module.exports = function(mongoose){
  //  var mongoose = require("mongoose");
    var WidgetSchema = mongoose.Schema({
        _page: [{type: mongoose.Schema.Types.ObjectId, ref: "PageModel"}],
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now()},
       // dateCreated: {type: new Date(), default: Date.now()},
        widgetType: {
            type: String,
            enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'],
            required: true
        }
    });

    return WidgetSchema;
}