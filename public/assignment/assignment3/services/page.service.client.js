/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService(){
        var pages = [
            { _id: "321", name: "Post 1", wid: "456" },
            { _id: "432", name: "Post 2", wid: "456" },
            { _id: "543", name: "Post 3", wid: "456" }
        ];

        var api =
        {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page)
        {

        }

        function findPageByWebsiteId(websiteId)
        {

        }

        function findPageById(pageId)
        {

        }

        function updatePage(pageId, page)
        {

        }

        function deletePage(pageId)
        {

        }
    }
})();