/**
 * Created by shraddha on 11/16/16.
 */
module.exports = function(){
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);
    var api = {
        createPage: createPage,
        findPageById: findPageById,
        findAllPagesForWebsite: findAllPagesForWebsite,
        updatePage: updatePage,
        deletePage: deletePage
    }
    return api;
    function createPage(page)
    {
        return PageModel.create(page);
    }

    function findPageById(pageId){
        return PageModel.find({_id: pageId})
    }

    function findAllPagesForWebsite(websiteId)
    {
        return PageModel.find({wid: websiteId});
    }

    function updatePage(pageId, page)
    {
        return PageModel.update({_id: pageId}, {name: page.name, title: page.title})
    }

    function deletePage(pageId)
    {
        return PageModel.remove({_id: pageId})
    }


}