/**
 * Created by shraddha on 11/26/16.
 */
module.exports = function(){
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
       // updateWidget: updateWidget,
        deleteWidget: deleteWidget,
       // reOrderWidget: reOrderWidget,
        setModel: setModel

    }
    return api;

    function setModel(_model)
    {
        model = _model;
    }

    function findAllWidgetsForPage(pageId)
    {
        return model.pageModel.findAllWidgetsForPage(pageId);
    }

    function createWidget(pageId, widget)
    {
        return WidgetModel
            .create(widget)
            .then(function(WidgetObj){
                model
                    .pageModel
                    .findPageById(pageId)
                    .then(function(PageObj){
                        PageObj.widgets.push(WidgetObj);
                        WidgetObj._page = PageObj._id;
                        WidgetObj.save();
                        PageObj.save();
                        return PageObj;
                    })
            })
    }

    function findWidgetById(pageId, widgetId)
    {
        return WidgetModel.find({_page: pageId, _id: widgetId})
    }

    function deleteWidget(widgetId)
    {
        return WidgetModel.remove({_id: widgetId});
    }


}