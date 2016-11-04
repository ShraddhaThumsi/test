/**
 * Created by shraddha on 10/16/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http){
        var idGenerator = 1200;
        console.log(idGenerator);


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
            var url = "/api/user/:uid/website/"+websiteId+"/page"
            return $http.post(url, page);


        }

        function findPageByWebsiteId(websiteId)
        {
            var url = "/api/user/:uid/website/"+websiteId+"/page";
            return $http.get(url);


        }

        function findPageById(uid, websiteId, pageId)
        {
            var url = "/api/user/"+uid+"/website/"+websiteId+"/page/"+pageId;
            return $http.get(url);

        }

        function updatePage(pageId, page)
        {

            var url = "/api/user/:uid/website/:wid/page/"+pageId;
            return $http.put(url, page);

        }

        function deletePage(pageId)
        {
            var url = "/api/user/:uid/website/:wid/page/"+pageId;

            return $http.delete(url, pageId);

        }
    }
})();