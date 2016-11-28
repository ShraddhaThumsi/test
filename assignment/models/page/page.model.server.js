/**
 * Created by shraddha on 11/16/16.
 */
module.exports = function(){
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);
    var api = {
        createPage: createPage,
        findPageById: findPageById,
        findAllPagesForWebsite: findAllPagesForWebsite,
        updatePage: updatePage,
        deletePage: deletePage,
        setModel: setModel,
        findAllWidgetsForPage: findAllWidgetsForPage
    }
    return api;
    function setModel(_model)
    {
        model = _model;
    }
    function createPage(websiteId, page)
    {

        return PageModel
            .create(page)
            .then(function(PageObj){
                    console.log(__filename);
                    console.log(PageObj);
                    //return PageObj;
                    return model
                        .websiteModel
                        .findWebsiteById(websiteId)
                        .then(function(WebsiteObj){

                                WebsiteObj.pages.push(PageObj);
                                PageObj._website = WebsiteObj._id;
                                PageObj.save();
                                WebsiteObj.save();
                                console.log(__filename);
                                console.log(PageObj);
                                console.log(WebsiteObj);
                                return PageObj;
                            },
                            function (error) {
                                console.log(error);
                            })
                },
                function(error)
                {
                    console.log(error);
                });

        // return PageModel.create(page);



    }

    function findPageById(pageId){
       return PageModel.findById(pageId)

    }

    function findAllPagesForWebsite(websiteId)
    {
        return model.websiteModel.findPagesForWebsite(websiteId);
       // return PageModel.find({wid: websiteId});
    }

    function updatePage(pageId, page)
    {

        return PageModel.update({_id: pageId}, {name: page.name, title: page.title})
    }

    function deletePage(pageId)
    {
        return PageModel.remove({_id: pageId})
    }

    function findAllWidgetsForPage(pageId){
        return PageModel
            .findById(pageId)
            .populate("widgets")
            .exec();
    }


}