/**
 * Created by shraddha on 11/16/16.
 */
module.exports = function(){
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findWebsiteById: findWebsiteById,
        findAllWebsitesForUser: findAllWebsitesForUser,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite

}
    return api;
    function createWebsite(website)
    {
        return WebsiteModel.create(website);
    }

    function findWebsiteById(websiteId)
    {
        return WebsiteModel.find({_id: websiteId})
    }

    function findAllWebsitesForUser(userId)
    {
        return WebsiteModel.find({uid: userId})
    }

    function updateWebsite(websiteId, website)
    {
        return WebsiteModel.update({
            _id: websiteId
        }, {
            name: website.name,
            description: website.description
        })
    }

    function deleteWebsite(websiteId)
    {
        return WebsiteModel.remove({_id: websiteId})
    }


}